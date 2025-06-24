import React from "react";
import RoomCard from "../components/RoomCard";
import SkeletonCard from "../components/SkeletonCard";
import { useRooms } from "../context/RoomContext";

export default function RoomListPage() {
  const { rooms, error, hasMore, loadMoreRef } = useRooms();

  // Initial loading state
  if (rooms.length === 0) {
    return (
      <div className="p-4 max-w-4xl mx-auto w-full flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Room Listings</h1>
        <div className="grid gap-4 items-center w-full md:w-[40%]">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={`skeleton-initial-${i}`} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Room Listings</h1>
      <div className="grid gap-4 items-center w-full md:w-[40%] justify-center">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}

        {/* Observer and loading indicator */}
        {hasMore && (
          <div ref={loadMoreRef}>
            <div className="w-full flex flex-col gap-4 items-center justify-center">
              <SkeletonCard />
            </div>
          </div>
        )}

        {error && <p className="text-red-500">Error loading data.</p>}
      </div>
    </div>
  );
}
