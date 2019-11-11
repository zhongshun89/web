<template>
  <v-app>
    <v-content>
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
</style>
