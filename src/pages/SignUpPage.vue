<template>
  <b-container>
    <b-form @submit.prevent="signUp" class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal text-center">Sign up</h1>
      <p v-if="error" class="text-danger text-center">{{error}}</p>
      <label for="new-email" class="sr-only">Email address</label>
      <input type="email"
             id="new-email"
             class="form-control text-center"
             placeholder="Email address"
             required
             autofocus
             autocomplete="email"
             v-model="email"
      />
      <label for="new-username" class="sr-only">Username</label>
      <input type="text"
             id="new-username"
             class="form-control text-center"
             placeholder="Username"
             required
             autofocus
             autocomplete="username"
             v-model="username"
      />
      <label for="new-password" class="sr-only">Password</label>
      <input
        type="password"
        id="new-password"
        class="form-control text-center"
        placeholder="Password"
        required
        autocomplete="new-password"
        v-model="password"/>
      <b-button type="submit" size="lg" variant="primary" class="btn-block">Sign up</b-button>
      <div class="text-center mt-5">
        <p>Already have an account?
          <b-link to="/signin">Sign in</b-link>
        </p>
      </div>
    </b-form>
  </b-container>
</template>

<script>
  import * as types from '../store/mutation-types'

  export default {
    name: 'SignUpPage',
    data () {
      return {
        email: '',
        username: '',
        password: '',
        error: ''
      }
    },
    methods: {
      signUp () {
        const self = this
        this.$store.dispatch(types.SIGNUP, {
          email: this.email,
          username: this.username,
          password: this.password
        }).then((response) => {
          if (response.status === 200) {
            response.json().then(json => {
              this.$store.commit(types.SIGNUP_SUCCESS, {
                token: json.token,
                username: self.username
              })
              this.$router.push('/my')
            })
          } else {
            response.json().then(json => {
              this.error = json.message
            })
            this.$store.commit(types.SIGNUP_ERROR)
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
