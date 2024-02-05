import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamApi = createApi({
  reducerPath: "shazamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam-api7.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "c2473e6a84msh42e3fb28a1e0445p112ac6jsnf9a56d188293"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => `/charts/get-top-songs-in_world_by_genre?genre=HIP_HOP_RAP&limit=50`,
    }),
    getTopChartsGenre: builder.query({
      query: (genre) =>
        `/charts/get-top-songs-in_world_by_genre?genre=${
          genre || "POP"
        }&limit=50`,
    }),
    getSongDetails: builder.query({
      query: (songid) => `/songs/get_details?id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: (id) => `/songs/list-recommendations?id=${id}`,
    }),
    getSongByCountry: builder.query({
      query: (countryCode) =>
        `/charts/get-top-songs-in-country?country_code=${countryCode}&limit=50`,
    }),
    getArtistsDetails: builder.query({
      query: (artistId) => `/artist/get-details?id=${artistId}`,
    }),
    getSearch: builder.query({
      query: (searchTerm) => `/search?term=${searchTerm}&limit=50`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetTopChartsGenreQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetSongByCountryQuery,
  useGetArtistsDetailsQuery,
  useGetSearchQuery,
} = shazamApi;
