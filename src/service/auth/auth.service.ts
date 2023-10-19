import { baseApi } from '@/service'
import {
  CurrentUserResponses,
  LoginUserRequest,
  PasswordRecoveryEmailRequest,
  ResetPasswordRequest,
  SignUpRequest,
  SignUpResponses,
  TokenAccessResponses,
  UpdateCurrentUserRequest,
  VerificationEmailAgainRequest,
  VerifyEmailRequest,
} from '@/service/auth/auth.types.ts'

export const authService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getAuthUserMeData: builder.query<CurrentUserResponses | null, void>({
        query: () => '/v1/auth/me',
        providesTags: ['Auth'],
        extraOptions: { maxRetries: false },
      }),
      updateAuthUserData: builder.mutation<CurrentUserResponses, UpdateCurrentUserRequest>({
        query: data => ({
          method: 'PATCH',
          url: '/v1/auth/me',
          body: data,
        }),
        invalidatesTags: ['Auth'],
      }),

      signInUser: builder.mutation<TokenAccessResponses, LoginUserRequest>({
        query: data => ({
          method: 'POST',
          url: '/v1/auth/login',
          body: data,
        }),
        invalidatesTags: ['Auth'],
      }),

      signUpUser: builder.mutation<SignUpResponses, SignUpRequest>({
        query: ({ email, password }) => ({
          method: 'POST',
          url: '/v1/auth/sign-up',
          body: { email, password },
        }),
        invalidatesTags: ['Auth'],
      }),
      verifyUserEmail: builder.mutation<unknown, VerifyEmailRequest>({
        query: data => ({
          method: 'POST',
          url: '/v1/auth/verify-email',
          body: data,
        }),
        invalidatesTags: ['Auth'],
      }),
      VerificationEmailAgain: builder.mutation<unknown, VerificationEmailAgainRequest>({
        query: data => ({
          method: 'POST',
          url: '/v1/auth/resend-verification-email',
          body: data,
        }),
        invalidatesTags: ['Auth'],
      }),
      LogoutUser: builder.mutation<unknown, void>({
        query: () => ({
          method: 'POST',
          url: '/v1/auth/logout',
        }),
        onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            authService.util.updateQueryData('getAuthUserMeData', undefined, () => {
              return null
            })
          )

          queryFulfilled.catch(patchResult.undo)
        },
      }),
      NewAccessToken: builder.mutation<unknown, PasswordRecoveryEmailRequest>({
        query: data => ({
          method: 'POST',
          url: '/v1/auth/recover-password',
          body: data,
        }),
        invalidatesTags: ['Auth'],
      }),
      ResetUserPassword: builder.mutation<unknown, ResetPasswordRequest>({
        query: data => ({
          method: 'DELETE',
          url: '/v1/auth/reset-password/{token}',
          body: data,
        }),
        invalidatesTags: ['Auth'],
      }),
    }
  },
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
