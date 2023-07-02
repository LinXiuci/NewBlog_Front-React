import { useState, useEffect } from "react";
// import axios, { AxiosResponse } from 'axios';
// import debounce from "../utils/debounce";

// 文章资源 - 文章查询
const articleURI = "articles?title_like=";

interface FetchResult<T> {
  data: T[];
  isLoading: boolean;
  error: Error | null;
}
/**
 * @description 自定义Hooks - GET 请求
 * @param {string} url 请求的链接
 * @param {number} delay 请求的延迟
 * @return {T[]} data 返回数组类型的数据
 *  */
function useAxiosGet<T>(url: string, delay: number = 500): FetchResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    const fetchResults = async () => {
      try {
        if (!url) {
          // 需要清空搜索框的内容
          setData([]);
          return;
        }
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/" + articleURI + url);
        const json = await response.json();
        setData(json);
        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
        setError(error);
      }
    };

    timeoutId = setTimeout(fetchResults, delay);
    return () => clearTimeout(timeoutId);
  }, [url, delay]);

  return { data, isLoading, error };
}

export default useAxiosGet;
