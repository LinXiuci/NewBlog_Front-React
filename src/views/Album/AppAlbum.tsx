import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { getBannerResources, backupBannerResources } from "../../api/app-banner-api";
import "./css/app-album.css";

interface bannerResourcesType {
  key: string;
  url: string;
}
/***
 * @description 公共页面 - 相册页
 *  */
function AppAlbum() {
  // 导航跳转
  const navigate: NavigateFunction = useNavigate();
  // 获取 banner 资源
  const [data, setData] = useState<bannerResourcesType[]>([]);
  // 获取 banner 资源时出现错误
  const [error, setError] = useState<Error | null>(null);

  // 请求 banner 资源
  const fetchResults = async () => {
    const { results, error } = await getBannerResources<bannerResourcesType>();
    setData(results || backupBannerResources);
    setError(error);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // 当前 banner 的索引
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // 控制 banner-container 元素
  const bannerContainerRef = useRef<HTMLElement>(null);

  // 根据 index 显示背景图片
  const showBanner = (index: number): void => {
    const offset = -index * (bannerContainerRef.current?.offsetWidth ?? 0);
    if (bannerContainerRef.current) {
      bannerContainerRef.current.style.transform = `translateX(${offset}px)`;
    }
  };

  // 下一个 Banner
  const nextBanner = useCallback(() => {
    let newIndex = currentIndex + 1;
    // 当索引 >= 图片的数据时，索引重置
    if (newIndex >= (bannerContainerRef.current?.childElementCount ?? 0)) newIndex = 0;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  useEffect(() => {
    showBanner(currentIndex);
    const timeout = setInterval(nextBanner, 5000);
    // 避免在窗口大小变化时频繁地触发轮播逻辑
    const handleResize = () => showBanner(currentIndex);
    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentIndex, nextBanner]);

  return (
    <main className="app-album">
      {/* banner 区 */}
      <section className="app-album-banner-container" ref={bannerContainerRef}>
        {error ? (
          <article className="app-album-banner">{error.message}</article>
        ) : (
          <>
            {data.map((item) => (
              <article key={item.key} style={{ backgroundImage: `URL(${item.url})` }} className="app-album-banner"></article>
            ))}
          </>
        )}
      </section>
      {/* 作品展示区 */}
      <section className="app-album-works-display-container">
        <div className="app-album-works-display-title">作品展示</div>
        <div className="app-album-line"></div>
        <div className="app-album-works-display-text">这是一个图片展览区...</div>
        <div className="app-album-works-display-enter" onClick={() => navigate("/app-album/classification")}>
          点击进入
        </div>
      </section>
    </main>
  );
}
export default AppAlbum;
