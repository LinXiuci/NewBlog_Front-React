
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

export const backupBannerResources = [
    {
        "key": "1",
        "url": "https://raw.githubusercontent.com/VenchiXie/VenchiXie.github.io/main/imgs/%E5%B0%8F%E6%97%B6%E5%80%99%E7%9A%84%E8%AE%B0%E5%BF%86.png"
    },
    {
        "key": "2",
        "url": "https://venchixie.github.io/imgs/banner2.jpg"
    },
    {
        "key": "3",
        "url": "https://venchixie.github.io/imgs/banner3.jpg"
    }
]