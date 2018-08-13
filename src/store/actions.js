import fetch from 'isomorphic-fetch'
import router from '../router'
import * as types from './mutation-types'

const signIn = ({commit}, creds) => {
  commit(types.SIGNIN)
  return fetch('/api/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: JSON.stringify(creds)
  })
}

const signOut = ({commit}) => {
  commit(types.SIGNOUT)
  router.push('/')
}

const signUp = ({commit}, user) => {
  commit(types.SIGNUP)
  return fetch('/api/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: JSON.stringify(user)
  })
}

export default {
  [types.SIGNIN]: signIn,
  [types.SIGNOUT]: signOut,
  [types.SIGNUP]: signUp
}
