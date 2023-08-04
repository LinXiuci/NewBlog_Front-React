import { useEffect, useRef, useState } from "react";
import { useNavigate, NavigateFunction, useSearchParams } from "react-router-dom";

import LazyImageComponent from "../components/lazyImage-component";
import { getImageResources } from "../../../api/app-album-api";
import "../css/detailed-page.css";
interface DetailedResultType {
  key: string;
  title: string;
  url: string;
  images: ImageType[];
}
interface ImageType {
  key: string;
  src: string;
}
/**
 * @description 图片详细页
 *  */
function DetailedPage() {
  // 导航跳转
  const navigate: NavigateFunction = useNavigate();

  const [params] = useSearchParams();
  // 存储图片
  const [data, setData] = useState<ImageType[]>([]);

  const fetchResults = async () => {
    const key: string | null = params.get("key");
    if (key !== null) {
      const { results } = await getImageResources<DetailedResultType>(key);
      // 解析 images 数组
      const [element] = results;
      setData(element.images);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  //当前页数
  const [currentPage, setCurrentPage] = useState(1);
  // 根据当前页数显示内容
  const pageDisplayContent = data.slice((currentPage - 1) * 6, currentPage * 6);
  // 设置总页数
  const totalPage = Math.ceil(data.length / 6);

  // 记录当前图片的下标
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // 用于是否预览框
  const [isOpen, setIsOpen] = useState(false);
  // 用于获取预览框的容器元素
  const previewContainerRef = useRef<HTMLImageElement>(null);

  // 上一页
  const handlePreviousClick = (): void => {
    let newIndex = currentPage - 1;
    if (newIndex < 1) return;
    setCurrentPage(newIndex);
  };

  // 下一页
  const handleNextClick = (): void => {
    const newIndex = currentPage + 1;
    if (newIndex > totalPage) return;
    setCurrentPage(newIndex);
  };

  // 打开预览，根据下标 index 打开预览图片
  const handleOpenPreview = (event: React.MouseEvent<HTMLImageElement, globalThis.MouseEvent>, index: number) => {
    event.preventDefault();
    setCurrentImageIndex(index);
    setIsOpen(true);
    document.body.style.overflowY = "hidden";
  };

  // 关闭预览
  const handleClosePreview = () => {
    setIsOpen(false);
    document.body.style.overflowY = "scroll";
  };

  // 判断鼠标点击位置是否在容器元素内，如果是，则不关闭预览框，否则关闭预览框。
  const handleOutsideClick = (e: MouseEvent) => {
    if (previewContainerRef.current?.contains(e.target as Node)) return;
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

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPage;
  return (
    <main className="app-album-detail-page">
      <header className="app-album-detial-page-header">
        <span onClick={() => navigate(-1)}>&gt;</span>
      </header>
      {/* 展示图片 */}
      <article className="app-album-image-container">
        {pageDisplayContent.map(({ key, src }, index) => (
          <LazyImageComponent
            key={key}
            src={src}
            currentImageIndex={index}
            handleOpenPreview={handleOpenPreview}
          ></LazyImageComponent>
        ))}
      </article>
      <footer className="app-album-detial-page-footer">
        <button
          style={{ color: isPreviousDisabled ? "var(--app-text-tags)" : "" }}
          onClick={handlePreviousClick}
          disabled={isPreviousDisabled}
        >
          &lt;
        </button>
        <button
          style={{ color: isNextDisabled ? "var(--app-text-tags)" : "" }}
          onClick={handleNextClick}
          disabled={isNextDisabled}
        >
          &gt;
        </button>
      </footer>

      {/* 展示预览图片 */}
      {isOpen && (
        <article className="app-album-preview-overlay">
          <img
            className="app-album-preview-container"
            src={pageDisplayContent[currentImageIndex].src}
            ref={previewContainerRef}
          />
          <button className="app-album-preview-close" onClick={handleClosePreview}>
            关闭
          </button>
        </article>
      )}
    </main>
  );
}

export default DetailedPage;
