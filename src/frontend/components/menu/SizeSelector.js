export default function SizeSelector({ sizes, selectedSize, onSelectSize }) {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-end mb-3">
        <h3 className="font-bold text-gray-900">Select Size</h3>
        <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">Required</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sizes.map(size => {
          const isSelected = selectedSize?.id === size.id;
          return (
            <label 
              key={size.id}
              className={`
                flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all
                ${isSelected 
                  ? "border-brand-charcoal bg-gray-50 shadow-sm" 
                  : "border-gray-200 hover:border-gray-300 bg-white"}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center
                  ${isSelected ? "border-brand-charcoal" : "border-gray-300"}
                `}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-brand-charcoal"></div>}
                </div>
                <span className={`font-semibold ${isSelected ? "text-brand-charcoal" : "text-gray-700"}`}>
                  {size.name}
                </span>
              </div>
              <span className={`font-bold ${isSelected ? "text-brand-charcoal" : "text-gray-600"}`}>
                ₹{size.price}
              </span>
              
              {/* visually hidden input for accessibility */}
              <input 
                type="radio"
                name="productSize"
                value={size.id}
                checked={isSelected}
                onChange={() => onSelectSize(size)}
                className="sr-only"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
