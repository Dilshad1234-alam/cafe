"use client";

import React, { useState, useEffect, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Printer, ArrowLeft } from 'lucide-react';

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export default function OrderInvoicePage({ params }) {
  const unwrappedParams = use(params);
  const { orderNumber } = unwrappedParams;
  const searchParams = useSearchParams();
  const guestToken = searchParams.get('guestToken');
  const router = useRouter();

  const [invoiceData, setInvoiceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hide navbar and footer during print by manipulating classes if needed, 
    // or rely on a global @media print CSS. We will add a style block.
    
    const fetchInvoice = async () => {
      try {
        let url = `/api/account/orders/${orderNumber}/invoice`;
        if (guestToken) {
          url += `?guestToken=${encodeURIComponent(guestToken)}`;
        }
        
        const res = await fetch(url);
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.message || "Failed to load receipt");
        }
        
        setInvoiceData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInvoice();
  }, [orderNumber, guestToken]);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 no-print">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-charcoal"></div>
      </div>
    );
  }

  if (error || !invoiceData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 no-print">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-gray-100">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
            ⚠️
          </div>
          <h1 className="text-2xl font-bold mb-4">Receipt Not Found</h1>
          <p className="text-gray-600 mb-8">{error || "We couldn't load this receipt."}</p>
          <button 
            onClick={() => router.back()}
            className="block w-full py-3 bg-brand-charcoal text-white rounded-xl font-bold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { business, invoice, customer, order, items, pricing, payment } = invoiceData;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}} />

      <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center no-print">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-xl transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-charcoal text-white rounded-xl font-bold shadow-sm hover:bg-gray-800 transition-colors"
        >
          <Printer className="w-4 h-4" />
          Print / Save as PDF
        </button>
      </div>

      <div id="printable-invoice" className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 print:shadow-none print:border-none print:p-0">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start border-b border-gray-200 pb-8 mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-black text-brand-charcoal tracking-tight mb-2 uppercase">{business.name}</h1>
            <div className="text-sm text-gray-500 leading-relaxed">
              <p>{business.address}</p>
              <p>{business.city}, {business.state} {business.pincode}</p>
              <p className="mt-1">Phone: {business.phone}</p>
              {business.email && <p>Email: {business.email}</p>}
            </div>
          </div>
          <div className="text-left sm:text-right">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 uppercase tracking-widest text-gray-300">RECEIPT</h2>
            <p className="font-mono text-gray-900 font-semibold mb-1">{invoice.number}</p>
            <p className="text-sm text-gray-500">Date: {new Date(invoice.date).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Billed To</h3>
            <p className="font-bold text-gray-900 mb-1">{customer.fullName}</p>
            <p className="text-sm text-gray-600 mb-1">{customer.phone}</p>
            {customer.email && <p className="text-sm text-gray-600 mb-2">{customer.email}</p>}
            
            {order.orderType === 'delivery' && invoiceData.deliveryAddress && (
              <div className="text-sm text-gray-600 mt-2">
                <p className="font-semibold text-gray-700 mb-1">Delivery Address:</p>
                <p>{invoiceData.deliveryAddress.house}, {invoiceData.deliveryAddress.area}</p>
                <p>{invoiceData.deliveryAddress.city}, {invoiceData.deliveryAddress.state} - {invoiceData.deliveryAddress.pincode}</p>
              </div>
            )}
            {order.orderType === 'takeaway' && (
              <div className="text-sm text-gray-600 mt-2">
                <p className="font-semibold text-gray-700">Order Type: Takeaway</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Payment Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Order Number:</span>
                <span className="font-semibold text-gray-900">{order.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Method:</span>
                <span className="font-medium capitalize text-gray-900">
                  {payment.method === 'online' ? 'Razorpay' : payment.method.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className={`font-bold capitalize ${payment.status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                  {payment.status}
                </span>
              </div>
              {payment.maskedPaymentId && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Transaction ID:</span>
                  <span className="font-mono text-gray-900">{payment.maskedPaymentId}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8 overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Qty</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Price</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-4">
                    <p className="font-bold text-gray-900">{item.name}</p>
                    {item.selectedSize && <p className="text-xs text-gray-500 mt-1">Size: {item.selectedSize.name}</p>}
                    {item.selectedAddOns?.length > 0 && (
                      <p className="text-xs text-gray-500 mt-0.5">Add-ons: {item.selectedAddOns.map(a => a.name).join(', ')}</p>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center font-medium text-gray-900">{item.quantity}</td>
                  <td className="px-4 py-4 text-right text-gray-600">{formatCurrency(item.unitPrice)}</td>
                  <td className="px-4 py-4 text-right font-bold text-gray-900">{formatCurrency(item.itemTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-12">
          <div className="w-full sm:w-1/2 space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(pricing.subtotal)}</span>
            </div>
            {pricing.deliveryFee > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>{formatCurrency(pricing.deliveryFee)}</span>
              </div>
            )}
            {pricing.tax > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>{formatCurrency(pricing.tax)}</span>
              </div>
            )}
            {pricing.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{formatCurrency(pricing.discount)}</span>
              </div>
            )}
            <div className="flex justify-between pt-4 border-t border-gray-200 text-lg font-black text-gray-900">
              <span>Total Amount</span>
              <span>{formatCurrency(pricing.total)}</span>
            </div>
            
            <div className="pt-4 border-t-2 border-gray-900 space-y-2 mt-4">
              <div className="flex justify-between text-sm font-semibold text-gray-700">
                <span>Amount Paid</span>
                <span>{formatCurrency(pricing.amountPaid)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-brand-red">
                <span>Balance Due</span>
                <span>{formatCurrency(pricing.balanceDue)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="font-bold text-gray-900 mb-1">Thank you for your order!</p>
          <p className="text-sm text-gray-500 mb-4">If you have any questions, please contact us.</p>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">This is a computer-generated receipt</p>
        </div>

      </div>
    </div>
  );
}
