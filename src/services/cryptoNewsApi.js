import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const CryptoNewsHeaders = {

    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '8bc8a5ffbemsh19d4eec80096ccdp1674cfjsn2c5268e63553'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/';

const createRequest = (url, newsCategory, count) => ({ 
    url, 
    headers: CryptoNewsHeaders,
    params: {
        q: newsCategory, 
        count: count, 
        freshness: 'Day',
        textFormat: 'Raw',
        safeSearch: 'Off'}
});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({ 
            query: ({newsCategory, count}) => createRequest('/news/search', newsCategory, count),
        })
    })
});

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;