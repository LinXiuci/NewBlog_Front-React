/**
 * @description 防抖函数
 * @param{T} func 函数
 * @param{number} delay 延迟
 *  */
export default function debounce<T extends (...args: any[]) => any>(func: T, delay: number = 500) {
  let timeoutId: ReturnType<typeof setTimeout>;

  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };

  return debounced as typeof debounced & { cancel: () => void };
}
