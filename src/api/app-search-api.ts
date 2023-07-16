type SearchResultsType<T> = {
    results: T[];
    error?: any;
};

// 通过 keywords 查询文章
export const getSearchResources = async <T>(keywords: string): Promise<SearchResultsType<T>> => {
    try {
        const response = await fetch(`http://localhost:8080/articles-api?title_like=${keywords}`);
        const results = await response.json();
        return { results }
    } catch (error) {
        return { results: [], error };
    }
}