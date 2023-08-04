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

export const backupAlbumResources = [
    {
        "key": "1",
        "title": "风格1",
        "url": "https://hachiiiiiiii.co/assets/images/schale_thumb.webp",
        "images": [
            {
                "key": 111,
                "src": "https://venchixie.github.io/imgs/肖宫.gif"
            },
            {
                "key": 1,
                "src": "https://venchixie.github.io/imgs/1.jpg"
            },
            {
                "key": 2,
                "src": "https://venchixie.github.io/imgs/2.jpg"
            },
            {
                "key": 3,
                "src": "https://venchixie.github.io/imgs/3.jpg"
            },
            {
                "key": 4,
                "src": "https://venchixie.github.io/imgs/4.jpg"
            },
            {
                "key": 5,
                "src": "https://venchixie.github.io/imgs/5.jpg"
            },
            {
                "key": 6,
                "src": "https://venchixie.github.io/imgs/6.jpg"
            },
            {
                "key": 7,
                "src": "https://venchixie.github.io/imgs/7.jpg"
            },
            {
                "key": 8,
                "src": "https://venchixie.github.io/imgs/8.jpg"
            },
            {
                "key": 9,
                "src": "https://venchixie.github.io/imgs/9.jpg"
            },
            {
                "key": 10,
                "src": "https://venchixie.github.io/imgs/10.jpg"
            },
            {
                "key": 11,
                "src": "https://venchixie.github.io/imgs/background.jpg"
            },
            {
                "key": 12,
                "src": "https://venchixie.github.io/imgs/banner1.jpg"
            },
            {
                "key": 13,
                "src": "https://venchixie.github.io/imgs/banner2.jpg"
            },
            {
                "key": 14,
                "src": "https://venchixie.github.io/imgs/banner3.jpg"
            }
        ]
    },
    {
        "key": "2",
        "title": "风格2",
        "url": "https://hachiiiiiiii.co/assets/images/KR_PIS.webp",
        "images": [
            {
                "key": 111,
                "src": "https://venchixie.github.io/imgs/肖宫.gif"
            },
            {
                "key": 1,
                "src": "https://venchixie.github.io/imgs/1.jpg"
            },
            {
                "key": 2,
                "src": "https://venchixie.github.io/imgs/2.jpg"
            },
            {
                "key": 3,
                "src": "https://venchixie.github.io/imgs/3.jpg"
            },
            {
                "key": 4,
                "src": "https://venchixie.github.io/imgs/4.jpg"
            },
            {
                "key": 5,
                "src": "https://venchixie.github.io/imgs/5.jpg"
            }
        ]
    },
    {
        "key": "3",
        "title": "风格3",
        "url": "https://hachiiiiiiii.co/assets/images/millenniumID.webp",
        "images": [
            {
                "key": 111,
                "src": "https://venchixie.github.io/imgs/肖宫.gif"
            },
            {
                "key": 1,
                "src": "https://venchixie.github.io/imgs/1.jpg"
            },
            {
                "key": 2,
                "src": "https://venchixie.github.io/imgs/2.jpg"
            },
            {
                "key": 3,
                "src": "https://venchixie.github.io/imgs/3.jpg"
            },
            {
                "key": 4,
                "src": "https://venchixie.github.io/imgs/4.jpg"
            },
            {
                "key": 5,
                "src": "https://venchixie.github.io/imgs/5.jpg"
            },
            {
                "key": 6,
                "src": "https://venchixie.github.io/imgs/6.jpg"
            },
            {
                "key": 7,
                "src": "https://venchixie.github.io/imgs/7.jpg"
            },
            {
                "key": 8,
                "src": "https://venchixie.github.io/imgs/8.jpg"
            }
        ]
    },
    {
        "key": "4",
        "title": "风格4",
        "url": "https://hachiiiiiiii.co/assets/images/thumbnail_schale.webp",
        "images": [
            {
                "key": 6,
                "src": "https://venchixie.github.io/imgs/6.jpg"
            },
            {
                "key": 7,
                "src": "https://venchixie.github.io/imgs/7.jpg"
            },
            {
                "key": 8,
                "src": "https://venchixie.github.io/imgs/8.jpg"
            },
            {
                "key": 9,
                "src": "https://venchixie.github.io/imgs/9.jpg"
            },
            {
                "key": 10,
                "src": "https://venchixie.github.io/imgs/10.jpg"
            },
            {
                "key": 11,
                "src": "https://venchixie.github.io/imgs/background.jpg"
            },
            {
                "key": 12,
                "src": "https://venchixie.github.io/imgs/banner1.jpg"
            },
            {
                "key": 13,
                "src": "https://venchixie.github.io/imgs/banner2.jpg"
            },
            {
                "key": 14,
                "src": "https://venchixie.github.io/imgs/banner3.jpg"
            }
        ]
    },
    {
        "key": "5",
        "title": "风格5",
        "url": "https://hachiiiiiiii.co/assets/images/MillenniumCPU.webp",
        "images": [
            {
                "key": 111,
                "src": "https://venchixie.github.io/imgs/肖宫.gif"
            },
            {
                "key": 1,
                "src": "https://venchixie.github.io/imgs/1.jpg"
            },
            {
                "key": 2,
                "src": "https://venchixie.github.io/imgs/2.jpg"
            },
            {
                "key": 3,
                "src": "https://venchixie.github.io/imgs/3.jpg"
            },
            {
                "key": 4,
                "src": "https://venchixie.github.io/imgs/4.jpg"
            },
            {
                "key": 11,
                "src": "https://venchixie.github.io/imgs/background.jpg"
            },
            {
                "key": 12,
                "src": "https://venchixie.github.io/imgs/banner1.jpg"
            },
            {
                "key": 13,
                "src": "https://venchixie.github.io/imgs/banner2.jpg"
            },
            {
                "key": 14,
                "src": "https://venchixie.github.io/imgs/banner3.jpg"
            }
        ]
    }
]



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
