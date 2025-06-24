import React, { useState } from "react";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) return null;

  const showPrev = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const showNext = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <img
        src={images[current]}
        alt={`Room ${current + 1}`}
        loading="lazy"
        className="w-full h-full object-cover transition-all duration-300"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={showPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow hover:bg-white"
            aria-label="Previous image"
          >
            &#8592;
          </button>
          <button
            onClick={showNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow hover:bg-white"
            aria-label="Next image"
          >
            &#8594;
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`inline-block w-2 h-2 rounded-full ${idx === current ? "bg-blue-500" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
