<template>
  <v-footer
    class="core-footer"
    absolute
  >
    <v-spacer />
    <span class="font-weight-light copyright caption">
      &copy;2019 三宝APP管理系统
    </span>
  </v-footer>
</template>

<script>
export default {
  data () {
    return {
      links: [
        { name: 'Home', Link: '/#' },
        { name: 'Creative Tim', Link: 'https://www.creative-tim.com' },
        { name: 'About Us', Link: 'https://creative-tim.com/presentation' },
        { name: 'Blog', Link: 'https://blog.creative-tim.com' }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
 .core-footer
   z-index: 0
</style>
