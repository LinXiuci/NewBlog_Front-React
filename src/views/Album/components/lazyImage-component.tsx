import React, { useState, useRef, useEffect } from "react";
import AppTextLoading from "../../../common/components/AppLoading/AppTextLoading";

type LazyImageProps = {
  src: string;
  currentIndex: number;
  handleOpenPreview: (event: React.MouseEvent<HTMLImageElement, globalThis.MouseEvent>, index: number) => void;
};
/**
 * @description 组件：图片懒加载
 * @param {Object} props src:图片资源，currentIndex：获取当前图片的下标，handleOpenPreview：根据 currentIndex 打开图片
 *  */
function LazyImageComponent({ src, currentIndex, handleOpenPreview }: LazyImageProps) {
  // 操作图片元素
  const imageRef = useRef<HTMLImageElement>(null);

  // 图片是否加载完毕
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && imageRef.current) {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            if (imageRef.current) {
              imageRef.current.src = src;
              setIsLoading(false);
              observer.unobserve(imageRef.current);
            }
          };
        }
      });
    });

    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, [src]);

  return (
    <div className="lazy-image-component">
      {isLoading && <div className="lazy-image-loading">Loading...</div>}

      {/* transition: "opacity 1s"  opacity: isLoading ? 0 : 1, */}
      <img
        style={{ opacity: isLoading ? 0 : 1 }}
        ref={imageRef}
        data-src={src}
        onClick={(e) => handleOpenPreview(e, currentIndex)}
      />
    </div>
  );
}

export default LazyImageComponent;
