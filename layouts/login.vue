<template>
  <v-app>
    <v-content class="page">
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" :duration="400">
        <nuxt />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
  .page
    background-image: url('/login-bg.png')
    background-repeat: no-repeat
    background-size: 100% 100%
</style>
