import React, { useRef, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

interface MediaViewerProps {
  video_url: string;
  room_images: string[];
}

export default function MediaViewer({
  video_url,
  room_images,
}: MediaViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !video_url) return;

    let hasLoaded = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasLoaded) {
            videoElement.src = video_url;
            hasLoaded = true;
          }
          videoElement.play().catch((e) => console.error("Autoplay failed", e));
        } else {
          videoElement.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(videoElement);

    return () => {
      observer.disconnect();
    };
  }, [video_url]);

  return (
    <div className="rounded-lg overflow-hidden relative h-[30vh]">
      {video_url ? (
        <video
          ref={videoRef}
          controls
          muted
          playsInline
          loop
          className="w-full h-full object-cover"
        />
      ) : room_images && room_images.length > 0 ? (
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
        >
          {room_images.map((imageUrl) => (
            <div key={imageUrl} className="h-[30vh]">
              <img
                src={imageUrl}
                alt="Room"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <p>No media available</p>
        </div>
      )}
    </div>
  );
}
