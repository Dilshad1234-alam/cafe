import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ quantity, setQuantity, max = 10 }) {
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-l-xl text-brand-charcoal bg-gray-50 hover:bg-gray-100 disabled:opacity-50 transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </button>
      <div className="w-12 h-10 flex items-center justify-center border-t border-b border-gray-200 font-bold text-brand-charcoal bg-white">
        {quantity}
      </div>
      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-r-xl text-brand-charcoal bg-gray-50 hover:bg-gray-100 disabled:opacity-50 transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
