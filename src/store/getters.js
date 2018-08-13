export const isAdmin = state =>
  state.auth.role === 'ADMIN'

export const isSignIn = state =>
  state.auth.isSignIn

export const getToken = state =>
  state.auth.token

export const getUsername = state =>
  state.auth.username
