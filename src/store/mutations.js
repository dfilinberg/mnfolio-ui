import * as types from './mutation-types'
import JWT from 'jsonwebtoken'

const secret = Buffer.from('LAJ588OIijIJuuuOIur40uAI', 'base64')
const mutations = {
  [types.SIGNIN] (state) {
    state.auth.pending = true
  },
  [types.SIGNINIT] (state) {
    const tokenString = localStorage.getItem('token')
    if (tokenString) {
      const token = JWT.verify(tokenString, secret)
      if (token) {
        state.auth.isSignIn = true
        state.auth.pending = false
        state.auth.token = tokenString
        state.auth.username = token.username
        state.auth.role = token.role
        localStorage.setItem('username', token.username)
        localStorage.setItem('role', token.role)
      }
    }
  },
  [types.SIGNIN_SUCCESS] (state, data) {
    const token = JWT.verify(data.token, secret)
    state.auth.isSignIn = true
    state.auth.pending = false
    state.auth.token = data.token
    state.auth.username = token.username
    state.auth.role = token.role
    localStorage.setItem('token', data.token)
    localStorage.setItem('username', token.username)
    localStorage.setItem('role', token.role)
  },
  [types.SIGNIN_WRONG_CREDENTIALS] (state) {
    state.pending = false
    state.auth.isSignIn = false
  },
  [types.SIGNIN_ERROR] (state) {
    state.pending = false
    state.auth.isSignIn = false
  },
  [types.SIGNOUT] (state) {
    state.auth.isSignIn = false
    state.auth.pending = false
    state.auth.token = null
    state.auth.username = null
    state.auth.role = null
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('role')
    console.log('signout')
  },
  [types.SIGNUP] (state) {

  },
  [types.SIGNUP_SUCCESS] (state) {

  },
  [types.SIGNUP_ERROR] (state) {

  }
}

export default mutations
