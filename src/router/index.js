import Vue from 'vue'
import Router from 'vue-router'

import IndexPage from '@/pages/IndexPage'
import CoinPage from '@/pages/CoinPage'
import CoinEditPage from '@/pages/CoinEditPage'
import DashboardPage from '@/pages/my/DashboardPage'
import MasternodesPage from '@/pages/my/MasternodesPage'
import MasternodePage from '@/pages/my/MasternodePage'
import RewardsPage from '@/pages/my/RewardsPage'
import SettingsPage from '@/pages/my/SettingsPage'
import UpcomingPage from '@/pages/UpcomingPage'
import AddPage from '@/pages/AddPage'
import FAQPage from '@/pages/FAQPage'
import ListingPage from '@/pages/ListingPage'
import StatsPage from '@/pages/StatsPage'
import SignUpPage from '@/pages/SignUpPage'
import SignInPage from '@/pages/SignInPage'
import SignOutPage from '@/pages/SignOutPage'

import store from '../store'
import * as types from '../store/mutation-types'

const hasToken = (to, from, next) => {
  const token = localStorage.getItem('JWT')
  const username = localStorage.getItem('username')
  if (token) {
    store.commit(types.SIGNIN_SUCCESS, {token, username})
    router.push('/my')
  } else {
    next()
  }
}

const requireAuth = (to, from, next) => {
  if (store.getters.isSignIn) {
    next()
  } else {
    router.push('/')
  }
}

// const requireAdmin = (to, from, next) => {
//   if (store.getters.isSignIn) {
//     next()
//   } else {
//     router.push('/')
//   }
// }

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage,
      beforeEnter: hasToken
    },
    {
      path: '/coins/edit/:ticker?',
      name: 'CoinEditPage',
      component: CoinEditPage
    },
    {
      path: '/coins/:ticker',
      name: 'CoinPage',
      component: CoinPage
    },
    {
      path: '/my',
      name: 'DashboardPage',
      component: DashboardPage,
      beforeEnter: requireAuth
    },
    {
      path: '/my/masternodes/:id',
      name: 'MasternodePage',
      component: MasternodePage
    },
    {
      path: '/my/masternodes',
      name: 'MasternodesPage',
      component: MasternodesPage
    },
    {
      path: '/my/rewards/:id?',
      name: 'RewardsPage',
      component: RewardsPage
    },
    {
      path: '/my/settings',
      name: 'SettingsPage',
      component: SettingsPage
    },
    {
      path: '/upcoming',
      name: 'UpcomingPage',
      component: UpcomingPage
    },
    {
      path: '/add',
      name: 'AddPage',
      component: AddPage
    },
    {
      path: '/faq',
      name: 'FAQPage',
      component: FAQPage
    },
    {
      path: '/listing',
      name: 'ListingPage',
      component: ListingPage
    },
    {
      path: '/stats',
      name: 'StatsPage',
      component: StatsPage
    },
    {
      path: '/signup',
      name: 'SignUpPage',
      component: SignUpPage
    },
    {
      path: '/signin',
      name: 'SignInPage',
      component: SignInPage
    },
    {
      path: '/signout',
      name: 'SignOutPage',
      component: SignOutPage
    }
  ]
})

export default router
