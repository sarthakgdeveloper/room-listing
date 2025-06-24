import React, { useState } from "react";

// Props for LazyImage component
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  isInView: boolean;
}

// LazyImage displays an image with a blur-up effect and only loads when in view
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  isInView = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageSrc = isInView ? src : "";

  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      {/* Blurred background placeholder, fades out when image loads */}
      <div
        style={{ backgroundImage: `url(${imageSrc})` }}
        className={`
          absolute inset-0 w-full h-full bg-cover bg-center
          transition-opacity duration-300
          ${isLoaded ? "opacity-0" : "opacity-100 blur-md"}
        `}
      />
      {/* Actual image, fades in when loaded */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => {
            setIsLoaded(true);
          }}
          className={`
              relative w-full h-full object-cover
              transition-opacity duration-300
              ${isLoaded ? "opacity-100" : "opacity-0"}
            `}
        />
      )}
    </div>
  );
};

export default LazyImage;
