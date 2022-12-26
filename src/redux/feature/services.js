import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const youtubeClone = createApi({
    reducerPath: "youtubeClone",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://youtube-search-and-download.p.rapidapi.com",
        prepareHeaders: (headers) => {
            headers.set("X-RapidAPI-Key", "5ef1710c58mshaa5122c6a3e4441p16275cjsn0cd48ca6f4bd")
            headers.set("X-RapidAPI-Host", "youtube-search-and-download.p.rapidapi.com")
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTrendingVideos: builder.query({
            query: (type) => `/trending?type=${type}&hl=en&gl=PK`,
        }),
        getChannelContent: builder.query({
            query: (id)=> `/channel?id=${id}`
        }),
        getChannelInfo: builder.query({
            query: (id)=> `/channel/about?id=${id}`
        }),
        getVideoInfo: builder.query({
            query: (id)=> `/video?id=${id}`
        }),
        getRelatedVideosInfo: builder.query({
            query: (id)=> `video/related?id=${id}`
        }),
        search: builder.query({
            query: (query,date,type,features,duration)=> `/search?query=${query}&upload_date=${date}&type=${type}&feature=${features}&duration=${duration}`
        })
    })
});

export const {
    useGetRelatedVideosInfoQuery,
    useGetTrendingVideosQuery,
    useGetChannelContentQuery,
    useGetChannelInfoQuery,
    useGetVideoInfoQuery,
    useSearchQuery
} = youtubeClone;