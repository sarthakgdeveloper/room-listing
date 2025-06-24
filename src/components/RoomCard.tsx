import React, { useState } from "react";
import MediaViewer from "./MediaViewer";
import { Room, Variant } from "../types/room";

function VariantCard({ variant }: { variant: Variant }) {
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

export default function RoomCard({ room }: { room: Room }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const firstVariant = room.variants[0];
  const otherVariants = room.variants.slice(1);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="p-4 border rounded-xl shadow-md w-full">
      <MediaViewer video_url={room.video_url} room_images={room.room_images} />
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">{room.roomName}</h2>

        {firstVariant && (
          <VariantCard key={firstVariant.id} variant={firstVariant} />
        )}

        <div
          className={`grid transition-all duration-500 ease-in-out ${
            isExpanded
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-4">
              {otherVariants.map((variant) => (
                <VariantCard key={variant.id} variant={variant} />
              ))}
            </div>
          </div>
        </div>

        {otherVariants.length > 0 && (
          <button
            onClick={toggleExpansion}
            className="w-full text-center mt-4 text-blue-600 font-semibold hover:underline"
          >
            {isExpanded
              ? "Show less"
              : `Show ${otherVariants.length} more variants`}
          </button>
        )}
      </div>
    </div>
  );
}
