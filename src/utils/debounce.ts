/**
 * @description 防抖函数
 * @param{T} func 函数
 * @param{number} delay 延迟
 *  */
export default function debounce(func: (...args: any[]) => void, delay: number = 500) {
  let timer: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
