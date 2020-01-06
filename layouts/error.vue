<template>
  <v-container class="pa-0 c-container" fluid>
    <v-row class="text-center c-container__row" align="center" justify="center" no-gutters>
      <v-col :cols="12">
        <v-icon class="c-container__row__icon--error">
          mdi-alert
        </v-icon>
      </v-col>
      <v-col :cols="12">
        <p class="headline error--text">
          {{ prompt }}
        </p>
        <p class="subtitle-1 error--text">
          {{ message }}
        </p>
      </v-col>
      <v-col :cols="12">
        <v-btn fab large @click="goBack">
          <v-icon class="c-container__row__icon--undo">
            mdi-arrow-left
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  layout: 'info',
  computed: {
    statusCode () {
      return this.error.statusCode
    },
    prompt () {
      if (this.statusCode === 404) {
        return '页面不存在!'
      }
      return '访问出错'
    },
    message () {
      return this.error.message
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="sass" scoped>
  .c-container
    background-color: var(--v-white)
    height: 100%
    width: 100% !important
    &__row
      height: 100%
      &__icon--error
        width: 10rem !important
        height: 10rem !important
        font-size: 10rem !important
        color: var(--v-error-base) !important
      &__icon--undo
        color: var(--v-primary-base) !important
</style>
