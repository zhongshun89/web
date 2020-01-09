<template>
  <v-app>
    <nuxt />
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

export default {
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
</style>
