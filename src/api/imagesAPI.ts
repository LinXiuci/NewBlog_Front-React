

type FetchResultsType<T> = {
    results: T[];
    error?: any;
};

const getImageResources = async <T>(current: string): Promise<FetchResultsType<T>> => {
    try {
        const response = await fetch("http://localhost:8080/" + `images-api?_page=${current}&_limit=6`);
        const results = await response.json();

        return { results }
    } catch (error) {
        return { results: [], error };
    }
};

export default getImageResources;