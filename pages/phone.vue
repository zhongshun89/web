<template>
  <v-row class="c-row" align="center" justify="center" align-content="center">
    <v-col cols="6" class="text-center" align-self="center">
      <v-icon class="c-row__icon">
        mdi-alert
      </v-icon>
      <p class="pt-5 mb-0 error--text">
        请用电脑访问
      </p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  auth: false,
  layout: 'phone',
  data () {
    return {}
  }
}
</script>

<style lang="sass" scoped>
  .c-row
      height: 100%
      &__icon
        width: 2rem !important
        height: 2rem !important
        font-size: 2rem !important
        color: var(--v-error-base) !important
</style>
