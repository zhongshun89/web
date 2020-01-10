<template>
  <v-app>
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

<style lang="sass" scoped>
</style>
