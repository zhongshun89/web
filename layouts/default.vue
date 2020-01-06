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
    <v-snackbar
      v-model="showSnackbar"
      :color="color"
      right
      bottom
      multi-line
      @input="closeSnackbar"
    >
      {{ text }}
      <v-btn
        text
        @click="closeSnackbar"
      >
        关闭
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { INFO } from '~/public/constants'
import HomeDrawer from '~/components/home/Drawer'
import HomeFooter from '~/components/home/Footer'
import HomeBar from '~/components/home/Bar'

export default {
  components: {
    HomeDrawer,
    HomeFooter,
    HomeBar
  },
  data () {
    return {
      showSnackbar: false
    }
  },
  computed: {
    ...mapState('notices', [
      'notices',
      'active'
    ]),
    ...mapGetters('notices', [
      'firstNotice'
    ]),
    text () {
      return this.firstNotice ? this.firstNotice.text : ''
    },
    color () {
      if (this.firstNotice) {
        return this.firstNotice.type === INFO ? 'info' : 'error'
      }
      return null
    }
  },
  watch: {
    active (value) {
      if (value) {
        this.showSnackbar = true
      }
    }
  },
  methods: {
    ...mapActions('notices', [
      'removeFirstNotice'
    ]),
    closeSnackbar () {
      this.showSnackbar = false
      this.removeFirstNotice()
    }
  }
}
</script>

<style lang="sass" scoped>
  .c-content
    background-color: white
    &__page
      margin-bottom: 60px
</style>
