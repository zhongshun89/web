<template>
  <v-container class="fill-height" fluid>
    <home-bar />
    <home-drawer />
    <v-content class="grey lighten-3">
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="400">
        <nuxt />
      </transition>
    </v-content>
    <home-footer />
  </v-container>
</template>

<script>
import HomeDrawer from '~/components/home/Drawer'
import HomeFooter from '~/components/home/Footer'
import HomeBar from '~/components/home/Bar'

export default {
  components: {
    HomeDrawer,
    HomeFooter,
    HomeBar
  }
}
</script>

<style lang="sass" scoped>
</style>
