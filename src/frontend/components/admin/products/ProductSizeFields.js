import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';

export default function ProductSizeFields({ control, register, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  return (
    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-gray-900">Sizes</h4>
          <p className="text-xs text-gray-500">Add size variations (e.g., Small, Large) and their full prices.</p>
        </div>
        <button
          type="button"
          onClick={() => append({ name: '', price: 0 })}
          className="text-xs font-bold text-brand-charcoal bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:border-brand-yellow transition-colors flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Add Size
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-3">
            <div className="flex-1">
              <input
                {...register(`sizes.${index}.name`)}
                placeholder="Size Name (e.g. Medium)"
                className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
              {errors?.sizes?.[index]?.name && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.sizes[index].name.message}</p>
              )}
            </div>
            <div className="w-32">
              <input
                {...register(`sizes.${index}.price`, { valueAsNumber: true })}
                type="number"
                step="0.01"
                placeholder="Price (₹)"
                className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
              {errors?.sizes?.[index]?.price && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.sizes[index].price.message}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-0.5"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {fields.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-2 bg-white rounded-lg border border-dashed border-gray-200">
            No sizes added. The base price will be used.
          </p>
        )}
      </div>
    </div>
  );
}
