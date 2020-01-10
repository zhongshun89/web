<template>
  <v-app class="c-app">
    <nuxt />
    <Snackbar />
  </v-app>
</template>

<script>
import Snackbar from '~/components/public/Snackbar'

export default {
  components: {
    Snackbar
  }
}
</script>

<style lang="sass">
  html
    overflow: hidden !important
    -ms-overflow-style: none
  html::-webkit-scrollbar
    width: 0
    height: 0
</style>
