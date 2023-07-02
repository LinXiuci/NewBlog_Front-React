import { useState, useEffect } from "react";

interface FetchResult<T> {
  data: T[];
  isLoading: boolean;
  error: Error | null;
}

type FetchResultsType<T> = {
  results: T[];
  error?: any;
};
/**
 * @description 自定义Hooks - GET 请求
 * @param {string}      fetchResults 请求的函数
 * @param {number}      delay 请求的延迟
 * @return {T[]}        data 返回数组类型的数据
 *  */
function useAxiosGet1<T>(delay: number = 500, ...args: any[]): FetchResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    // const { results, error }: FetchResultsType<T> = fetchResults();

    // if (error) {
    //   setError(error);
    // }

    // if (!results) {
    //   setData([]);
    //   return;
    // } else {
    //   setIsLoading(true);
    //   setData(results);
    //   setIsLoading(false);
    // }

    // timeoutId = setTimeout(fetchResults, delay);
    // return () => clearTimeout(timeoutId);
  }, [args, delay]);

  return { data, isLoading, error };
}

export default useAxiosGet1;
