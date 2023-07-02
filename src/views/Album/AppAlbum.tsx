import { useState, useEffect } from "react";
import Pagination from "../../common/components/AppPagination/AppPagination";
import PreviewComponent from "./components/preview-component";

import getImageResources from "../../api/imagesAPI";
import "./css/app-album.css";

type imageResourcesType = {
  key: string | number;
  url: string;
};
/***
 * @description 公共页面 - 相册页
 *  */
function AppAlbum() {
  // 存储图片数据
  const [data, setData] = useState<imageResourcesType[]>([]);
  // 请求错误
  const [error, setError] = useState<Error | null>(null);
  // 定义一个状态变量，用于存储当前页数。
  const [current, setCurrent] = useState<number>(() => {
    const currentPageLocalStorage = localStorage.getItem("currentPageLocalStorage");
    return currentPageLocalStorage ? Number(currentPageLocalStorage) : 1;
  });

  // 请求图片数据 current - 当前页
  const fetchResults = async (current: number) => {
    // 生成缓存键，用来存储和获取数据
    const cachKey = current.toString();
    // 从 sessionStorage 中检查是否有缓存数据
    const cacheData = sessionStorage.getItem(cachKey);

    const { results, error } = await getImageResources<imageResourcesType>(String(current));

    // 若有缓存数据，则将解析后的数据放到 data 中
    if (cacheData) {
      setData(JSON.parse(cacheData));
    }

    if (error) {
      // 若请求出错，则设置错误信息到组件状态中
      setError(error);
    } else {
      // 若请求成功，则将结果 data 中，并将结果保存到 sessionStorage 中，以供以后使用
      setData(results || []);
      sessionStorage.setItem(cachKey, JSON.stringify(results));
    }
  };

  // 上一页
  const handlePreviousClick = (): void => {
    setCurrent(current - 1);
  };

  // 下一页
  const handleNextClick = (): void => {
    setCurrent(current + 1);
  };

  // 当 current 发生改变时，则储存当前的页数。
  useEffect(() => {
    localStorage.setItem("currentPageLocalStorage", String(current));
    fetchResults(current);
  }, [current]);

  // 设置总页数
  // const totalPage = Math.ceil(data.length / pageDisplayContent);

  // 计算当前页面展示的内容
  // const pageDisplayContents: imageResourcesType[] = data.slice(
  //   (current - 1) * pageDisplayContent,
  //   current * pageDisplayContent
  // );

  // 是否禁用上一页按钮的条件是当前页是否为第一页
  const isPreviousDisabled = current === 1;
  // 是否禁用下一页按钮的条件是当前页加 1 是否等于总页数
  const isNextDisabled = current === 3;

  if (error) {
    return <section>Error:{error.message}</section>;
  }
  return (
    <main className="app-album">
      <section className="app-album-main">
        {/* 图片展示 */}
        <article className="app-album-preview">
          <PreviewComponent imgUrlList={data} initialIndex={0}></PreviewComponent>
        </article>

        {/* 分页 */}
        <article className="app-album-pagination">
          <Pagination
            onPreviousClick={handlePreviousClick}
            onNextClick={handleNextClick}
            isPreviousDisabled={isPreviousDisabled}
            isNextDisabled={isNextDisabled}
          ></Pagination>
        </article>
      </section>
    </main>
  );
}
export default AppAlbum;
