import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const CryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '8bc8a5ffbemsh19d4eec80096ccdp1674cfjsn2c5268e63553'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com/';

const createUrl = (url) => ({ url, headers: CryptoApiHeaders});
const createGetCryptos = (url, count) => ({ 
    url, 
    headers: CryptoApiHeaders,
    params: {limit: count}
});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({ 
            query: (count) => createGetCryptos('/coins', count),
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createUrl(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createUrl(`/coin/${coinId}/history/${timePeriod}`),
        }),
        getExchanges: builder.query({ 
            query: () => createUrl('/exchanges'),
        }),
    })
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
    useGetExchangesQuery
} = cryptoApi;
  