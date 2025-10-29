'use client';

import { ProductVariant } from './types';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onVariantSelect: (variant: ProductVariant) => void;
}

export default function VariantSelector({
  variants,
  selectedVariant,
  onVariantSelect,
}: VariantSelectorProps) {
  if (!variants || variants.length === 0) {
    return null;
  }

  // Group variants by variant_name
  const variantGroups = variants.reduce((acc, variant) => {
    const name = variant.variant_name;
    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push(variant);
    return acc;
  }, {} as Record<string, ProductVariant[]>);

  return (
    <div className="space-y-6">
      {Object.entries(variantGroups).map(([variantName, options]) => (
        <div key={variantName}>
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            {variantName}
          </h3>
          <div className="flex flex-wrap gap-2">
            {options.map((variant) => {
              const isSelected = selectedVariant?.id === variant.id;
              const isAvailable = variant.is_available && variant.stock_quantity > 0;

              return (
                <button
                  key={variant.id}
                  onClick={() => isAvailable && onVariantSelect(variant)}
                  disabled={!isAvailable}
                  className={`
                    px-4 py-2 rounded-lg border-2 transition-all
                    ${isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-medium'
                      : 'border-gray-300 hover:border-gray-400'
                    }
                    ${!isAvailable
                      ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400'
                      : 'cursor-pointer'
                    }
                  `}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-sm">{variant.variant_value}</span>
                    {variant.price_adjustment !== 0 && (
                      <span className="text-xs text-gray-500 mt-1">
                        {variant.price_adjustment > 0 ? '+' : ''}
                        {variant.price_adjustment.toLocaleString('vi-VN')} ₫
                      </span>
                    )}
                    {!isAvailable && (
                      <span className="text-xs text-red-500 mt-1">Hết hàng</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
