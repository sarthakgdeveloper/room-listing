import React from "react";
import { Variant } from "../types/room";

const PriceDisplay = ({ price }: { price: Variant["price"] }) => (
  <div className="flex items-center gap-2 my-2">
    {price.discountPercent > 0 && (
      <p className="text-sm text-gray-500 line-through">₹{price.original}</p>
    )}
    <p className="text-lg font-bold text-blue-600">₹{price.discounted}</p>
    {price.discountPercent > 0 && (
      <span className="text-sm text-green-600 font-medium">
        {price.discountPercent}% off
      </span>
    )}
  </div>
);

const IconLabel = ({ icon, label }: { icon: string; label: string }) => (
  <p className="flex items-center gap-2">
    <span>{icon}</span> {label}
  </p>
);

export default function VariantCard({ variant }: { variant: Variant }) {
  const { variantName, price, meal, bedType, maxAdults, cancellationPolicy } =
    variant;
  return (
    <div className="border-t pt-4 mt-4">
      <h3 className="font-semibold text-md text-gray-800">{variantName}</h3>

      <PriceDisplay price={price} />

      <div className="space-y-2 text-sm text-gray-600">
        {meal && <IconLabel icon="🍽️" label={meal} />}
        {bedType && <IconLabel icon="🛏️" label={bedType} />}
        {maxAdults && <IconLabel icon="👥" label={maxAdults} />}
      </div>

      {cancellationPolicy && (
        <p className="mt-3">
          <span className="mr-2 text-sm text-green-600">✓</span>
          <span className="text-sm text-green-600">Cancellation Policy:</span>
          <p className="text-xs">{cancellationPolicy}</p>
        </p>
      )}
    </div>
  );
}
