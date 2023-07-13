import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import tabs from "../../utils/footer-tabs";
import "../style/app-footer.css";

interface PropsType {
  items: {
    name: string;
    sub_tab: (
      | {
          name: string;
          href: string;
          path?: undefined;
        }
      | {
          name: string;
          path: string;
          href?: undefined;
        }
    )[];
  };
  onNavigate: (value: string) => void;
}

/***
 * @description 公共组件 - 底部组件
 *  */
function AppFooter() {
  // const navigate = useNavigate()
  // const { pathname } = useLocation();
  // const onNavigate = (value: string) => {
  //   // if (value == pathname) return
  //   alert("暂未开放");
  //   // navigate(value)
  //   // setBackToTop(0)
  // };

  return (
    <footer className="app-footer">
      <section className="app-footer-main">
        {tabs.map((items) => (
          <article className="app-footer-items" key={items.key}>
            <strong className="app-footer-item-title">{items.name}</strong>
            <div className="app-footer-item">
              {items.sub_tab.map((item) => {
                return item.href ? (
                  <a key={item.key} href={item.href}>
                    {item.name}
                  </a>
                ) : (
                  <p key={item.key}>{item.name}</p>
                );
              })}
            </div>
          </article>
        ))}
      </section>
      {/* 声明与备案 */}
      <section className="declaration-and-filing">
        <a href="declaration">Venchi</a>
        <a href="filing">filing</a>
      </section>
    </footer>
  );
}
export default AppFooter;

/* 子列表渲染 */
