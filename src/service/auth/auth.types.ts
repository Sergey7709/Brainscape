export type CurrentUserResponses = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

export type UpdateCurrentUserRequest = {
  avatar: string
  name: string
  email: string
}

export type LoginUserRequest = {
  password: string
  email: string
  rememberMe?: boolean
}

export type TokenAccessResponses = {
  accessToken: string
}
export type SignUpRequest = {
  html?: string
  name?: string
  password: string
  email: string
  subject?: string
  sendConfirmationEmail?: boolean
}

export type SignUpResponses = {
  avatar: string
  id: string
  email: string
  isEmailVerified: boolean
  name: string
  created: string
  updated: string
}

export type VerifyEmailRequest = {
  code: string
}

export type VerificationEmailAgainRequest = {
  html: string
  userId: string
  subject: string
}

export type PasswordRecoveryEmailRequest = {
  html?: string
  email: string
  subject?: string
}

export type ResetPasswordRequest = {
  password: string
  token: string
}
