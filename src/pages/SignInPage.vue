<template>
  <b-container>
    <b-form @submit.prevent="signIn" class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
      <p v-if="error" class="text-danger text-center">{{error}}</p>
      <label for="email" class="sr-only">Email address</label>
      <input type="email"
             id="email"
             class="form-control text-center"
             placeholder="Email address"
             required
             autofocus
             v-model="username"
      />
      <label for="password" class="sr-only">Password</label>
      <input
        type="password"
        id="password"
        class="form-control text-center"
        placeholder="Password"
        required
        v-model="password"/>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <b-button type="submit" size="lg" variant="primary" class="btn-block">Sign in</b-button>
      <div class="text-center mt-5">
        <p>New to MNfolio.com?
          <b-link to="/signup">Create an account</b-link>
        </p>
      </div>
    </b-form>
  </b-container>
</template>

<script>
  import * as types from '../store/mutation-types'

  export default {
    name: 'SignInPage',
    created: function () {
      if (this.$store.state.isSignIn) {
        this.$router.push('my')
      }
    },
    data () {
      return {
        username: '',
        password: '',
        error: ''
      }
    },
    methods: {
      signIn () {
        const self = this
        this.$store.dispatch(types.SIGNIN, {
          username: this.username,
          password: this.password
        }).then((response) => {
          if (response.status === 200) {
            response.json().then(json => {
              this.$store.commit(types.SIGNIN_SUCCESS, {
                token: json.token,
                username: self.username
              })
              this.$router.push('/my')
            })
          } else if (response.status === 401) {
            response.json().then(json => {
              this.error = json.message
            })
            this.$store.commit(types.SIGNIN_WRONG_CREDENTIALS)
          } else {
            response.json().then(json => {
              this.error = json.message
            })
            this.$store.commit(types.SIGNIN_ERROR)
          }
        }).catch(json => {
          this.error = 'Unable to connect server.'
        })
      }
    }
  }
</script>

<style scoped>

</style>
