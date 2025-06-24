import React, { useState, useEffect } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  isInView: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  isInView,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isInView && isLoaded) {
      setIsLoaded(false);
    }
  }, [isInView, isLoaded]);

  const imageSrc = isInView ? src : "";

  return (
    <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
      <div
        style={{ backgroundImage: `url(${imageSrc})` }}
        className={`
          absolute inset-0 w-full h-full bg-cover bg-center
          transition-opacity duration-300
          ${isLoaded ? "opacity-0" : "opacity-100 blur-md"}
        `}
      />
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
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
