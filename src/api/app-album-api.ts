type BannerResultsType<T> = {
    results: T[];
    error?: any;
};
/**
 * @description 获取 banner 资源
 *  */
export const getBannerResources = async <T>(): Promise<BannerResultsType<T>> => {
    try {
        const response = await fetch(" http://localhost:8080/banner-api");
        const results = await response.json()
        return { results }
    } catch (error) {
        return { results: [], error }
    }
}


type AlbumResultsType<T> = {
    results: T[];
    error?: any;
};
/**
 * @description 获取分类背景图资源
 *  */
export const getAlbumResources = async <T>(): Promise<AlbumResultsType<T>> => {
    try {
        const response = await fetch("http://localhost:8080/app-album-api");
        const results = await response.json();
        return { results }
    } catch (error) {
        return { results: [], error };
    }
}



type ImageResultsType<T> = {
    results: T[];
    error?: any;
};
/**
 * @description 获取图片资源
 * @param {string} key 根据 key 获得图片的资源
 *  */
export const getImageResources = async <T>(key: string): Promise<ImageResultsType<T>> => {
    try {
        const response = await fetch(`http://localhost:8080/app-album-api?key=${key}`);
        const results = await response.json();
        return { results }
    } catch (error) {
        return { results: [], error };
    }
};
