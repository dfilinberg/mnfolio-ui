<template>
  <div></div>
</template>
<script>
  import * as types from '../store/mutation-types'

  export default {
    name: 'SignOutPage',
    created: function () {
      this.$store.dispatch(types.SIGNOUT)
    }
  }
</script>
