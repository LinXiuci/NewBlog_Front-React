/***
 * 自适应 rem 布局
 *  */

interface DocumentElement extends HTMLElement {
  dataset: DOMStringMap;
  style: CSSStyleDeclaration;
}

interface WindowWithSelf extends Window {
  top: Window | null;
  devicePixelRatio: number;
}

export function configureResponsiveLayout(doc: Document, win: WindowWithSelf) {
  const docEl: DocumentElement = doc.documentElement as DocumentElement;
  let isIOS: RegExpMatchArray | null = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  let dpr: number = isIOS ? Math.min(win.devicePixelRatio, 3) : 1;
  dpr = window.top === window.self ? dpr : 1; // 被 iframe 引用时，禁止缩放
  dpr = 1;
  let scale: number = 1 / dpr;
  const resizeEvt: string = "orientationchange" in window ? "orientationchange" : "resize";
  docEl.dataset.dpr = String(dpr);
  const metaEl: HTMLMetaElement = doc.createElement("meta");
  metaEl.name = "viewport";
  metaEl.content = `initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`;
  docEl.appendChild(metaEl);

  const recalc = function () {
    let width: number = docEl.clientWidth;
    if (width / dpr > 750) {
      width = 750 * dpr;
    }
    // 乘以 100，px : rem = 100 : 1
    docEl.style.fontSize = `${100 * (width / 750)}px`;
  };
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
}


// (function (doc, win) {
//   const docEl = doc.documentElement;
//   let isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//   let dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1;
//   dpr = window.top === window.self ? dpr : 1; // 被iframe引用时，禁止缩放
//   dpr = 1;
//   let scale = 1 / dpr;
//   const resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
//   docEl.dataset.dpr = dpr;
//   const metaEl = doc.createElement("meta");
//   metaEl.name = "viewport";
//   metaEl.content = "initial-scale=" + scale + ",maximum-scale=" + scale + ", minimum-scale=" + scale;
//   docEl.firstElementChild.appendChild(metaEl);
//   const recalc = function () {
//     let width = docEl.clientWidth;
//     if (width / dpr > 750) {
//       width = 750 * dpr;
//     }
//     // 乘以 100，px : rem = 100 : 1
//     docEl.style.fontSize = 100 * (width / 750) + "px";
//   };
//   recalc();
//   if (!doc.addEventListener) return;
//   win.addEventListener(resizeEvt, recalc, false);
// })(document, window);