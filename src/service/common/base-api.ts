import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { baseQueryWithReauth } from '@/service/auth/Auto-re-auth.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['Deck', 'Cards', 'Auth'],
})
