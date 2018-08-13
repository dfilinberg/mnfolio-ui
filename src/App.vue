<template>
  <div>
    <b-navbar toggleable="md" type="light" variant="light" class="mb-3 mt-3">
      <b-container>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar variant="faded" type="light">
          <b-navbar-brand to="/">
            <img src="/static/images/logo_150.png" alt="MNFOLIO.COM">
          </b-navbar-brand>
        </b-navbar>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item v-if="isSignIn" to="/my">Dashboard</b-nav-item>
            <b-nav-item v-if="isSignIn" to="/my/masternodes">Masternodes</b-nav-item>
            <b-nav-item v-if="isSignIn" to="/my/rewards">Rewards</b-nav-item>
            <b-nav-item v-if="isSignIn" to="/my/settings" class="mr-3">Settings</b-nav-item>
            <b-nav-item v-if="!isSignIn" to="/my/portfolio">Portfolio</b-nav-item>
            <b-nav-item v-if="!isSignIn" to="/my/monitoring">Monitoring</b-nav-item>
            <b-nav-item to="/upcoming">Upcoming</b-nav-item>
            <b-nav-item to="/faq">FAQ</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-text v-if="isSignIn" class="mr-2">Hello {{getUsername}}!</b-nav-text>
            <b-nav-item v-if="isSignIn" to="/signout">
              <icon name="sign-out"></icon>
              <span>Sign out</span>
            </b-nav-item>
            <b-nav-item v-else to="/signin">
              <icon name="sign-in"></icon>
              <span>Sign in</span>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
    <router-view/>
    <footer id="footer">
      <b-container>
        <b-row>
          <b-col>
            <p>
              mnfolio.com &copy; 2018 |
              Made by <a href="mailto:filinberg@gmail.com">Dmitry Filinberg</a> |
              Cointact us: <a href="mailto:support@mnfolio.com">support@mnfolio.com</a> |
              <b-link to="/listing">Listing & Advertising</b-link>
            </p>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>

<script>
  import * as types from '@/store/mutation-types'
  import {mapGetters} from 'vuex'

  export default {
    name: 'App',
    created: function () {
      this.$store.commit(types.SIGNINIT)
    },
    computed: mapGetters(['isAdmin', 'isSignIn', 'getUsername'])
  }
</script>

<style>
  @import url('https://bootswatch.com/4/cosmo/bootstrap.min.css');

  .navbar-brand {
    margin-right: 50px;
  }

  .fa-icon {
    vertical-align: middle;
    margin-right: 0.5rem;
    margin-top: -2px;
  }

  .fa-icon:last-child {
    margin-right: 0;
  }

  footer {
    margin-top: 30px;
    bottom: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 70px auto;
  }

  .form-signin .checkbox {
    font-weight: 400;
  }

  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
