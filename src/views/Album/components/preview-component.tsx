import React, { useState, useRef, useEffect, MouseEvent } from "react";
import LazyImageComponent from "./lazyImage-component";

type PreviewComponentProps = {
  imgUrlList: {
    key: string | number;
    url: string;
  }[];
  initialIndex: number;
};
/**
 * @description 组件：图片预览
 * @param {{ key: string | number; url: string; }[]} imgUrlList - 图片资源
 * @param {number} initialIndex - 预览图片的索引
 *  */
function PreviewComponent({ imgUrlList, initialIndex }: PreviewComponentProps) {
  // 用于是否预览框
  const [isOpen, setIsOpen] = useState(false);

  // 用于获取预览框的容器元素
  const containerRef = useRef<HTMLImageElement>(null);

  // 记录当前图片的下标
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // 判断鼠标点击位置是否在容器元素内，如果是，则不关闭预览框，否则关闭预览框。
  const handleOutsideClick = (e: MouseEvent) => {
    if (containerRef.current?.contains(e.target as Node)) return;
    // 关闭预览框
    handleClosePreview();
  };

  // 监听全局鼠标点击事件，如果点击了overlay，则关闭预览框
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick as unknown as EventListener);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick as unknown as EventListener);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick as unknown as EventListener);
    };
  }, [isOpen, handleOutsideClick]);

  // 打开预览
  const handleOpenPreview = (event: React.MouseEvent<HTMLImageElement, globalThis.MouseEvent>, index: number) => {
    event.stopPropagation();
    // 根据下标 index 打开预览图片
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflowY = "hidden";
  };

  // 关闭预览
  const handleClosePreview = () => {
    setIsOpen(false);
    document.body.style.overflowY = "scroll";
  };

  return (
    <>
      {/* 原始图片 */}
      {imgUrlList.map((item, index) => (
        <LazyImageComponent key={item.key} src={item.url} currentIndex={index}  handleOpenPreview={handleOpenPreview}></LazyImageComponent>
      ))}

      {/* 预览框，展示图片 */}
      {isOpen && (
        <div className="preview-overlay">
          <img className="preview-container" ref={containerRef} src={imgUrlList[currentIndex].url} />
          <button className="preview-close" onClick={handleClosePreview}>
            关闭
          </button>
        </div>
      )}
    </>
  );
}

export default PreviewComponent;

