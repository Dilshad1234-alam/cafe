"use client";

import { useCartStore } from "@/frontend/store/cartStore";
import CartItem from "./CartItem";

export default function CartItemList() {
  const items = useCartStore((state) => state.items);

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem key={item.itemKey || item.id} item={item} />
      ))}
    </div>
  );
}
