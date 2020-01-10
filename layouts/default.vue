<template>
  <v-app>
    <v-content class="c-content">
      <home-bar />
      <home-drawer />
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="400">
        <nuxt class="c-content__page" />
      </transition>
      <home-footer class="c-content__footer" />
    </v-content>
    <Snackbar></Snackbar>
  </v-app>
</template>

<script>
import HomeDrawer from '~/components/home/Drawer'
import HomeFooter from '~/components/home/Footer'
import HomeBar from '~/components/home/Bar'
import Snackbar from '~/components/public/Snackbar'

export default {
  components: {
    HomeDrawer,
    HomeFooter,
    HomeBar,
    Snackbar
  }
}
</script>

<style lang="sass" scoped>
  .c-content
    background-color: white
    &__page
      margin-bottom: 60px
</style>
