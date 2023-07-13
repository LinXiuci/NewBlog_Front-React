import { useEffect, useRef, useState } from "react";
import throttle from "../../utils/throttle";
import "../style/app-set-up.css";

/***
 * @description 公共组件 - 页面设置组件
 *  */
function AppSetup({ oldScrollTop }: any) {
  // 定义"设置"组件的样式操作变量
  const appSetupRef = useRef<HTMLElement>(null);

  // 定义主题变量，默认“dark”
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "dark");

  // 切换主题
  const handleSwitchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // 当 “theme” 发生变化时，主题就会切换，并储存到 localStorage 中刷新不变。
  useEffect(() => {
    document.body.setAttribute("theme-mode", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 回到顶部
  const handleSetBackToTop = (numberTop: number): void => {
    window.scroll({ top: numberTop, behavior: "smooth" });
  };

  // 当滚动的滚动距离>200时，“设置”组件将会显示出来，否则就会隐藏。
  const scrollToListener = () => {
    if (oldScrollTop > 150) {
      appSetupRef.current?.classList.add("active");
    } else {
      appSetupRef.current?.classList.remove("active");
    }
  };

  // 监听滚动
  useEffect(() => {
    document.addEventListener("scroll", throttle(scrollToListener, 500));
    return () => document.removeEventListener("scroll", throttle(scrollToListener, 500));
  }, [oldScrollTop]);

  return (
    <section className="app-setup" ref={appSetupRef}>
      <article onClick={handleSwitchTheme}>{theme === "dark" ? "白" : "夜"}</article>
      <article onClick={() => handleSetBackToTop(0)}>▲</article>
    </section>
  );
}

export default AppSetup;
