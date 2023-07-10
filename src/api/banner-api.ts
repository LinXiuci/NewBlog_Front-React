
type FetchResultsType<T> = {
    results: T[];
    error?: any;
};
/**
 * @description 获取 banner 资源
 *  */
export const getBannerResources = async <T>(): Promise<FetchResultsType<T>> => {
    try {
        const response = await fetch(" http://localhost:8080/banner-api");
        const results = await response.json()
        return { results }
    } catch (error) {
        return { results: [], error }
    }
}
