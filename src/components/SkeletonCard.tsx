import React from "react";
export default function SkeletonCard() {
  return (
    <div className="p-4 border rounded-xl shadow-md w-full">
      {/* Media skeleton */}
      <div className="bg-gray-200 rounded-lg animate-pulse h-[30vh]" />
      <div className="mt-4">
        {/* Room name */}
        <div className="h-6 w-1/2 bg-gray-300 rounded mb-1 animate-pulse" />
        {/* Variant name */}
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-2 animate-pulse" />

        {/* Price section */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 w-12 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-10 bg-gray-100 rounded animate-pulse" />
        </div>

        {/* Meal, Bed, Max Adults */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="bg-gray-200 rounded-full w-4 h-4 inline-block animate-pulse" />
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-gray-200 rounded-full w-4 h-4 inline-block animate-pulse" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-gray-200 rounded-full w-4 h-4 inline-block animate-pulse" />
            <div className="h-4 w-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="mt-3 flex items-center gap-2">
          <span className="bg-gray-200 rounded-full w-4 h-4 inline-block animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
