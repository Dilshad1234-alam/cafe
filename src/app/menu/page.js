import { Suspense } from "react";
import MenuPageClient from "./MenuPageClient";

export const metadata = {
  title: "Menu | The Tasty Zone",
  description: "Explore our freshly prepared burgers, pizzas, momos, fries, and cafe favourites at The Tasty Zone.",
};

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading menu...</div>}>
      <MenuPageClient />
    </Suspense>
  );
}
