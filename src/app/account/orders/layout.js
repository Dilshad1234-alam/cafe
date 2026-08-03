import { siteConfig } from "@/frontend/data/siteConfig";

export const metadata = {
  title: `My Orders | ${siteConfig.name}`,
  description: `View your past orders from ${siteConfig.name}.`,
};

export default function OrdersLayout({ children }) {
  return children;
}
