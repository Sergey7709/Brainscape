import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const baseApi = createApi({
  reducerPath: 'decksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['Deck', 'Cards'],
})
