// 导入父路由中来呈现其子路由元素
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
// 导入公共组件-导航栏组件
import AppNavigationBar from "./common/components/AppNavigationBar/AppNavigationBar";
// 侧边小工具
import AppSetup from "./common/components/AppSetup/AppSetup";
// 导入节流函数
import throttle from "./utils/throttle";
import AppFooter from "./common/components/AppFooter/AppFooter";

export default function App() {
  // 获取header元素
  const header = useRef<HTMLElement>(null);
  // 记录已滚动的滚动条高度位置
  const [oldScrollTop, setOldScrollTop] = useState<number>(
    document.documentElement.scrollTop || document.body.scrollTop
  );

  /**
   * handleScroll 是一个滚动事件监听器，它在页面滚动时被调用。
   * 它首先获取当前滚动条的位置，然后获取导航栏的高度，根据滚动条的位置和导航栏的高度，修改导航栏 <header> 的 CSS 类名，以实现样式变化。
   * 在处理完样式变化后，它还将当前滚动的位置存储在 oldScrollTop 状态变量中。
   *  */
  const handleScroll = (): void => {
    // 获取当前滚动的滚动条位置
    let currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 获取导航栏的高度
    const headerHeight: number = header.current?.offsetHeight ?? 0;

    // console.log(currentScrollTop);
    // console.log("old", oldScrollTop);

    // 当当前的滚动位置 > 导航栏高度时，则添加样式 ；
    if (currentScrollTop > headerHeight) {
      header.current?.classList.add("app-header-hide");
      header.current?.classList.remove("active");
    } else {
      header.current?.classList.remove("app-header-hide");
      header.current?.classList.add("active");
    }

    if (currentScrollTop < oldScrollTop) {
      header.current?.classList.remove("app-header-hide");
    }
    setOldScrollTop(document.documentElement.scrollTop || document.body.scrollTop);
  };

  // 监听滚动条
  useEffect(() => {
    document.addEventListener("scroll", throttle(handleScroll, 500));
    return () => document.removeEventListener("scroll", throttle(handleScroll, 500));
  }, [oldScrollTop]);

  // 禁止鼠标右击出现菜单
  // useEffect(() => {
  //   document.addEventListener("contextmenu", function (e) {
  //     e.preventDefault();
  //   });
  // }, []);

  return (
    <>
      {/* 搜索遮罩 */}
      {/* <AppSearch searchRef={searchRef} onCloseSearch={onCloseSearch}></AppSearch> */}
      {/* 侧边小工具 */}
      <AppSetup oldScrollTop={oldScrollTop}></AppSetup>
      <header className="app-header" ref={header}>
        <AppNavigationBar></AppNavigationBar>
      </header>
      <main style={{ width: "100%", height: "100%" }} className="app-main">
        <Outlet></Outlet>
      </main>
      {/* <AppFooter></AppFooter> */}
    </>
  );
}
