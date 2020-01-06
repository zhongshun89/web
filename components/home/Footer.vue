<template>
  <v-footer
    fixed
    color="barGrey"
    height="60"
  >
    <v-row class="c-row">
      <v-col v-if="drawer" class="placeholder" />
      <v-col class="text-left" align-self="center">
        <v-btn text small>
          官网
        </v-btn>
        <v-btn text small>
          联系我们
        </v-btn>
      </v-col>
      <v-spacer />
      <v-col cols="7" class="text-right" align-self="center">
        <span class="copyright">
          &copy;{{ (new Date()).getFullYear() }} 三宝管理系统
        </span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'drawer'
    ])
  }
}
</script>

<style lang="sass" scoped>
  .placeholder
    width: 9vw
</style>
