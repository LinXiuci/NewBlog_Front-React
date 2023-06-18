import { useRef } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import AppSearch from "../AppSearch/AppSearch";
import AppIcon from "../AppIcon/AppIcon";
import navigations from "../../../utils/navigations";
import "../../style/app-navigation-bar.css";

/***
 * @description 公共组件 - 导航栏组件
 **/
function AppNavigationBar() {
  // 导航
  const navigate: NavigateFunction = useNavigate();

  // 用于操作DOM的导航遮罩
  const appNavigationMask = useRef<HTMLDivElement>(null);
  // 用于操作DOM的导航菜单栏
  const appNavigationMenu = useRef<HTMLUListElement>(null);

  // 定义一个变量用于记录滚动条位置
  let scrollPosition: number | undefined;

  // 判断是否是 iOS 系统的 Safari 浏览器
  const isIosSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && /iPad|iPhone|iPod/.test(navigator.userAgent);

  // 对于 iOS 系统的 Safari 浏览器，需要禁用默认滚动行为
  const touchmoveHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  // 定义禁用滚动的函数
  const disableScroll = (): void => {
    // 如果scrollPosition已被定义，说明已经禁用了滚动，不需要重复执行
    if (scrollPosition !== undefined) {
      return;
    }

    // 记录当前滚动条位置
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // 将页面设置为 overflow: hidden，并禁止滚动
    // document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // 对于 iOS 系统的 Safari 浏览器，还需要禁用默认滚动行为
    if (isIosSafari) {
      document.addEventListener("touchmove", touchmoveHandler);
    }
  };

  // 定义启用滚动的函数
  const enableScroll = (): void => {
    // 如果scrollPosition未被定义，说明没有禁用滚动，不需要执行启用函数
    if (scrollPosition === undefined) {
      return;
    }
    // 还原 scrollPosition 记录的滚动位置
    window.scrollTo(0, scrollPosition);

    // 恢复页面的 overflow 属性
    // document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    // 对于 iOS 系统的 Safari 浏览器，还需要启用默认滚动行为
    if (isIosSafari) {
      document.removeEventListener("touchmove", touchmoveHandler);
    }
    scrollPosition = undefined;
  };

  // 用于打开菜单。点击切换按钮打开菜单
  const handleOpenMenu = (): void => {
    appNavigationMenu.current?.classList.add("active");
    appNavigationMask.current?.classList.add("active");
    disableScroll();
  };

  // 用于关闭菜单。通过点击遮罩关闭菜单1a
  const handleCloseMenu = (): void => {
    appNavigationMenu.current?.classList.remove("active");
    appNavigationMask.current?.classList.remove("active");
    enableScroll();
  };

  // 导航跳转
  const handleNavigate = (url: string | undefined): void => {
    if (url) {
      // 200
      navigate(url);
    } else {
      // 404
    }
  };

  return (
    <>
      {/* logo */}
      <section className="app-nav-logo" onClick={() => handleNavigate("/")}>
        Venchi
      </section>

      <nav className="app-nav">
        {/* 导航遮罩 */}
        <div className="app-nav-mask" onClick={handleCloseMenu} ref={appNavigationMask}></div>
        {/* 搜索 */}
        <AppSearch disableScroll={disableScroll} enableScroll={enableScroll}></AppSearch>

        {/*  切换按钮-菜单 (当屏幕 768px 时会显示)*/}
        <div className="app-nav-toggle" onClick={handleOpenMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className="app-nav-menu" ref={appNavigationMenu}>
          {navigations.map((items: any) => (
            <li key={items.key}>
              {/* 菜单标签 */}
              <p className="app-nav-menu-name">{items.title}</p>
              {/* 子菜单 */}
              <AppSecondaryMenuComponent items={items} handleNavigate={handleNavigate}></AppSecondaryMenuComponent>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

type AppSecondaryMenuComponentType = {
  items: {
    key: number;
    title: string;
    secondary_menu: (
      | {
          title: string;
          icon_name: string;
          path: undefined;
          href?: undefined;
        }
      | {
          title: string;
          icon_name: string;
          href: string;
          path?: undefined;
        }
    )[];
  };
  handleNavigate: (url: string | undefined) => void;
};
/**
 * @description 组件 - 次级菜单
 *  */
function AppSecondaryMenuComponent({ items, handleNavigate }: AppSecondaryMenuComponentType) {
  return (
    //  渲染子菜单项
    <div className="app-nav-submenu">
      {items.secondary_menu?.map((item) => {
        // 判断 api 中的元素是否有 href 项，有则使用a标签渲染，无则使用li标签渲染
        return item.href ? (
          <a key={item.title} href={item.href} target="__blank">
            <span className="app-nav-icon">
              <AppIcon name={item.icon_name} size="small"></AppIcon>
            </span>
            <span className="app-nav-submenuname">{item.title}</span>
            <span>&gt;</span>
          </a>
        ) : (
          <p key={item.title} onClick={() => handleNavigate(item.path)}>
            <span className="app-nav-icon">
              <AppIcon name={item.icon_name} size="small"></AppIcon>
            </span>
            <span className="app-nav-submenuname">{item.title}</span>
            <span>&gt;</span>
          </p>
        );
      })}
    </div>
  );
}

export default AppNavigationBar;
