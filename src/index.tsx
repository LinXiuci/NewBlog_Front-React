import React from "react";
import ReactDOM from "react-dom/client";
// 导入router
import AppRouter from "./router";
// 导入自适应布局
// import "./utils/adaptive-layout";
import { configureResponsiveLayout } from "./utils/adaptive-layout";

import reportWebVitals from "./reportWebVitals";
import "./common/style/index.css";

// 使用 configureResponsiveLayout 函数
configureResponsiveLayout(document, window);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
