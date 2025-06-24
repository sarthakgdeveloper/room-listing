import React, { useState, useEffect } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset loading state if the image source changes
    setIsLoading(true);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const imageClasses = `
    ${className || ""}
    transition-all duration-700 ease-in-out
    ${isLoading ? "blur-lg scale-110" : "blur-0 scale-100"}
  `;

  return (
    <img src={src} alt={alt} onLoad={handleLoad} className={imageClasses} />
  );
};

export default LazyImage;
