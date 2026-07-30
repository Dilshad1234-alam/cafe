import { Check } from "lucide-react";

export default function AddOnSelector({ addOns, selectedAddOns, onToggleAddOn }) {
  if (!addOns || addOns.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-end mb-3">
        <h3 className="font-bold text-gray-900">Add-ons</h3>
        <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">Optional</span>
      </div>
      <div className="flex flex-col gap-3">
        {addOns.map(addOn => {
          const isSelected = selectedAddOns.some(a => a.id === addOn.id);
          return (
            <label 
              key={addOn.id}
              className={`
                flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all
                ${isSelected 
                  ? "border-brand-yellow bg-brand-yellow/5 shadow-sm" 
                  : "border-gray-200 hover:border-gray-300 bg-white"}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border flex items-center justify-center
                  ${isSelected ? "border-brand-yellow bg-brand-yellow text-brand-charcoal" : "border-gray-300"}
                `}>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
                <span className={`font-semibold ${isSelected ? "text-brand-charcoal" : "text-gray-700"}`}>
                  {addOn.name}
                </span>
              </div>
              <span className="font-bold text-gray-600">
                +₹{addOn.price}
              </span>
              
              <input 
                type="checkbox"
                value={addOn.id}
                checked={isSelected}
                onChange={() => onToggleAddOn(addOn)}
                className="sr-only"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
