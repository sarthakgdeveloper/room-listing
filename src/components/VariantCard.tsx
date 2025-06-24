import React from "react";
import { Variant } from "../types/room";

export default function VariantCard({ variant }: { variant: Variant }) {
  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="font-semibold text-md text-gray-800">
        {variant.variantName}
      </h3>
      <div className="flex items-center gap-2 my-2">
        {variant.price.discountPercent > 0 && (
          <p className="text-sm text-gray-500 line-through">
            ₹{variant.price.original}
          </p>
        )}
        <p className="text-lg font-bold text-blue-600">
          ₹{variant.price.discounted}
        </p>
        {variant.price.discountPercent > 0 && (
          <span className="text-sm text-green-600 font-medium">
            {variant.price.discountPercent}% off
          </span>
        )}
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        {variant.meal && (
          <p className="flex items-center gap-2">
            <span>🍽️</span> {variant.meal}
          </p>
        )}
        {variant.bedType && (
          <p className="flex items-center gap-2">
            <span>🛏️</span> {variant.bedType}
          </p>
        )}
        {!!variant.maxAdults && (
          <p className="flex items-center gap-2">
            <span>👥</span> {variant.maxAdults}
          </p>
        )}
      </div>

      {variant.cancellationPolicy && (
        <p className="mt-3">
          <span className="mr-2 text-sm text-green-600">✓</span>
          <span className="text-sm text-green-600">Cancellation Policy:</span>
          <p className="text-xs">{variant.cancellationPolicy}</p>
        </p>
      )}
    </div>
  );
}
