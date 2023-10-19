import { createApi } from '@reduxjs/toolkit/dist/query/react'

import { authService } from '@/service'
import { baseQueryWithReauth } from '@/service/auth/Auto-re-auth.ts'

export const baseApi = createApi({
  reducerPath: 'decksApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['Deck', 'Cards', 'Auth'],
})

export const {
  useGetAuthUserMeDataQuery,
  useSignInUserMutation,
  useSignUpUserMutation,
  useLogoutUserMutation,
  useResetUserPasswordMutation,
  useVerificationEmailAgainMutation,
  useVerifyUserEmailMutation,
  useUpdateAuthUserDataMutation,
} = authService
