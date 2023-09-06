import axios from 'axios';

const NEWS_API_KEY = 'c3ed4c539ba94e15b6aa94ec40dc2924';

const newsService = axios.create({
    baseURL: 'https://newsapi.org/v2',
});

export const getNews = async () => {
    try {
        const query1 = 'sintoma';
        const query2 = 'alergia';


        const response1 = await newsService.get('/everything', {
            params: {
                q: query1,
                apiKey: NEWS_API_KEY,
            },
        });

        const response2 = await newsService.get('/everything', {
            params: {
                q: query2,
                apiKey: NEWS_API_KEY,
            },
        });

        const newsData1 = response1.data.articles;
        const newsData2 = response2.data.articles;
        const combinedNewsData = [...newsData1, ...newsData2];

        return combinedNewsData;
    } catch (error) {
        console.error(error);
        return [];
    }
};
