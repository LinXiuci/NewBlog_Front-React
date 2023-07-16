import { Suspense, useState, useEffect, useRef } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { getAlbumResources } from "../../../api/app-album-api";

import "../css/classification-page.css";

interface ClassificationResultsType {
  key: string;
  title: string;
  url: string;
}
/**
 * @description 图片分类组件
 *  */
function ClassificationPage() {
  // 导航跳转
  const navigate: NavigateFunction = useNavigate();

  const handleNavigate = (key: string) => {
    if (!key) return;
    navigate(`/app-album/classification/detailed?key=${key}`);
  };

  // 获取分类背景图资源
  const [data, setData] = useState<ClassificationResultsType[]>([]);
  // 获取分类背景图资源时出现错误
  const [error, setError] = useState<Error | null>(null);

  // 请求分类背景图资源
  const fetchResults = async () => {
    const { results, error } = await getAlbumResources<ClassificationResultsType>();
    setData(results);
    setError(error);
  };

  useEffect(() => {
    fetchResults();
    console.log(error);
  }, []);

  // 操作图片分类目录区的元素
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollLeftRef = useRef<HTMLButtonElement>(null);
  const scrollRightRef = useRef<HTMLButtonElement>(null);

  // 点击左右滚动
  const handleScrollContent = (event: any, scrollDistance: number): void => {
    event.preventDefault();

    const container = containerRef.current;
    if (!container) return;

    let currentScrollLeft = container.scrollLeft;
    let newScrollLeft = currentScrollLeft + scrollDistance;
    const isDisableButtonLeft = newScrollLeft <= 0;
    const isDisableButtonRight = newScrollLeft >= container.scrollWidth - container.clientWidth;
    // 当滚动到最大值时，不再滚动
    if (isDisableButtonLeft && isDisableButtonRight) return;

    isDisableButton(isDisableButtonLeft, isDisableButtonRight);
    container.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  // 是否禁用 button
  const isDisableButton = (isDisableButtonLeft: boolean, isDisableButtonRight: boolean): void => {
    if (scrollLeftRef.current && isDisableButtonLeft) {
      scrollLeftRef.current.classList.add("active");
      scrollLeftRef.current.disabled = true;
    } else {
      scrollLeftRef.current!.classList.remove("active");
      scrollLeftRef.current!.disabled = false;
    }

    if (scrollRightRef.current && isDisableButtonRight) {
      scrollRightRef.current.classList.add("active");
      scrollRightRef.current.disabled = true;
    } else {
      scrollRightRef.current!.classList.remove("active");
      scrollRightRef.current!.disabled = false;
    }
  };

  return (
    <main className="app-album-classification-component">
      {/* 目录头部 header */}
      <header className="app-album-classification-header">
        <div>目录</div>
        <div onClick={() => navigate(-1)}>Home</div>
      </header>
      {/* 图片分类目录区 */}
      <section className="app-album-classification-container" ref={containerRef}>
        {error ? (
          <article className="app-album-classification-content-item">{error.message}</article>
        ) : (
          <Suspense fallback={<div>loading...</div>}>
            {data.map((item) => (
              <article
                className="app-album-classification-content-item"
                key={item.key}
                onClick={() => handleNavigate(item.key)}
              >
                <div style={{ backgroundImage: `URL(${item.url})` }}></div>
                <div>{item.title}</div>
              </article>
            ))}
          </Suspense>
        )}
      </section>
      {/* 点击左右移动 */}
      <footer className="app-album-classification-footer">
        <button ref={scrollLeftRef} onClick={(e) => handleScrollContent(e, -containerRef.current!.offsetWidth)}>
          &lt;
        </button>
        <button ref={scrollRightRef} onClick={(e) => handleScrollContent(e, containerRef.current!.offsetWidth)}>
          &gt;
        </button>
      </footer>
    </main>
  );
}

export default ClassificationPage;
