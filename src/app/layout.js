import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/frontend/components/providers/ClientProvider";
import Navbar from "@/frontend/components/layout/Navbar";
import Footer from "@/frontend/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Tasty Zone Cafe | Fresh Taste. Happy Moments.",
  description: "Burgers, pizzas, momos, fries, shakes and more—freshly prepared for takeaway and delivery in Gondia.",
  keywords: "cafe, gondia, fast food, delivery, burgers, pizza, momos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`} suppressHydrationWarning>
        <ClientProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
