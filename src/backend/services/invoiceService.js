import "server-only";
import Order from "../models/Order";
import SiteSetting from "../models/SiteSetting";
import { siteConfig } from "@/frontend/data/siteConfig";

const generateInvoiceNumber = (orderNumber) => {
  return `RCPT-${orderNumber}`;
};

export const getInvoiceOrderData = async (orderNumber, authenticatedUser = null, guestToken = null) => {
  const order = await Order.findOne({ orderNumber }).lean();
  
  if (!order) {
    throw new Error("Order not found");
  }

  // Authorization Check
  let isAuthorized = false;

  // 1. Admin overrides
  if (authenticatedUser?.role === 'admin') {
    isAuthorized = true;
  } 
  // 2. User ownership
  else if (authenticatedUser && order.user && order.user.toString() === authenticatedUser._id.toString()) {
    isAuthorized = true;
  }
  // 3. Guest Token
  else if (guestToken && order.guestTokenHash) {
    const crypto = require("crypto");
    const providedHash = crypto.createHash("sha256").update(guestToken).digest("hex");
    if (providedHash === order.guestTokenHash) {
      isAuthorized = true;
    }
  }

  if (!isAuthorized) {
    throw new Error("Not authorized to view this receipt");
  }

  // Fetch Business Settings
  const settings = await SiteSetting.findOne().lean();
  
  const business = {
    name: settings?.businessName || siteConfig.name,
    phone: settings?.phone || siteConfig.phone,
    email: settings?.email || siteConfig.email,
    address: settings?.address || siteConfig.address,
    city: settings?.city || siteConfig.city,
    state: settings?.state || siteConfig.state,
    pincode: settings?.pincode || siteConfig.pincode,
    logo: siteConfig.logo, // Fallback to config logo for reliability
  };

  const isPaid = order.paymentStatus === 'paid';
  const amountPaid = isPaid ? order.pricing.total : 0;
  const balanceDue = isPaid ? 0 : order.pricing.total;

  let maskedPaymentId = null;
  if (order.razorpay?.paymentId) {
    maskedPaymentId = order.razorpay.paymentId.replace(/^pay_/, "pay_****");
  }

  return {
    business,
    invoice: {
      number: generateInvoiceNumber(order.orderNumber),
      date: order.createdAt,
    },
    customer: order.customer,
    deliveryAddress: order.deliveryAddress,
    order: {
      orderNumber: order.orderNumber,
      orderType: order.orderType,
      orderStatus: order.orderStatus,
    },
    items: order.items,
    pricing: {
      ...order.pricing,
      amountPaid,
      balanceDue,
    },
    payment: {
      method: order.paymentMethod,
      status: order.paymentStatus,
      maskedPaymentId
    }
  };
};
