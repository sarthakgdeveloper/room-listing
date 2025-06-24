import React from "react";
import { useInView } from "react-intersection-observer";
import ImageCarousel from "./ImageCarousel";

export default function MediaViewer({
  video_url,
  room_images,
}: {
  video_url?: string;
  room_images?: string[];
}) {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.25 });

  if (!video_url && (!room_images || room_images.length === 0)) return null;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-lg relative flex items-center justify-center bg-gray-100 h-[30vh]"
    >
      {video_url && inView ? (
        <video
          src={video_url}
          controls
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : room_images?.length && inView ? (
        <ImageCarousel images={room_images} />
      ) : (
        <div className="bg-gray-100 h-full w-full animate-pulse" />
      )}
    </div>
  );
}
