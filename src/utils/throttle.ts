/* 箭头函数类型-节流 */
export default function throttle(func: Function, delay: number) {
  let timer: any; // 计时器
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func();
      }, delay);
    }
  };
}
