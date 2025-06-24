import React, { useState } from "react";
import MediaViewer from "./MediaViewer";
import { Room } from "../types/room";
import VariantCard from "./VariantCard";

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
