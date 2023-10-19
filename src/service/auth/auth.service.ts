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
        query: (...data) => ({
          method: 'PATCH',
          url: '/v1/auth/me',
          body: data,
          invalidateTags: ['Auth'],
        }),
      }),
      signInUser: builder.mutation<TokenAccessResponses, LoginUserRequest>({
        query: (...data) => ({
          method: 'POST',
          url: '/v1/auth/login',
          body: data,
          invalidateTags: ['Auth'],
        }),
      }),
      signUpUser: builder.mutation<SignUpResponses, SignUpRequest>({
        query: (...data) => ({
          method: 'POST',
          url: '/v1/auth/sign-up',
          body: data,
          invalidateTags: ['Auth'],
        }),
      }),
      verifyUserEmail: builder.mutation<unknown, VerifyEmailRequest>({
        query: (...data) => ({
          method: 'POST',
          url: '/v1/auth/verify-email',
          body: data,
          invalidateTags: ['Auth'],
        }),
      }),
      VerificationEmailAgain: builder.mutation<unknown, VerificationEmailAgainRequest>({
        query: (...data) => ({
          method: 'POST',
          url: '/v1/auth/resend-verification-email',
          body: data,
          invalidateTags: ['Auth'],
        }),
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
        query: (...data) => ({
          method: 'POST',
          url: '/v1/auth/recover-password',
          body: data,
          invalidateTags: ['Auth'],
        }),
      }),
      ResetUserPassword: builder.mutation<unknown, ResetPasswordRequest>({
        query: (...data) => ({
          method: 'DELETE',
          url: '/v1/auth/reset-password/{token}',
          body: data,
          invalidateTags: ['Auth'],
        }),
      }),
    }
  },
})
