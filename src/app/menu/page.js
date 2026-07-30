import MenuPageClient from "./MenuPageClient";

export const metadata = {
  title: "Menu | The Tasty Zone",
  description: "Explore our freshly prepared burgers, pizzas, momos, fries, and cafe favourites at The Tasty Zone.",
};

export default function MenuPage() {
  // We keep the main page as a Server Component for SEO and basic layout,
  // and load the interactive client portion.
  return <MenuPageClient />;
}
