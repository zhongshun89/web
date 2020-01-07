<template>
  <v-row class="c-row" align="center" justify="center">
    <v-col cols="3">
      <ValidationProvider v-slot="{ errors }" name="邮箱" rules="required|email">
        <v-text-field
          dark
          v-model="email"
          label="请输入邮箱地址"
          hide-details
          single-line
          append-icon="mdi-arrow-right-thick"
          @click:append="next"
        />
        <p class="error--text caption mt-4">
          {{ errors[0] }}
        </p>
      </ValidationProvider>
    </v-col>
  </v-row>
</template>

<script>
import { ValidationProvider, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN'

export default {
  auth: false,
  layout: 'prompt',
  components: {
    ValidationProvider
  },
  data () {
    return {
      email: ''
    }
  },
  created () {
    extend('required', {
      ...required,
      message: zh.messages.required
    })
    extend('email', {
      ...email,
      message: zh.messages.email
    })
  },
  methods: {
    next () {}
  }
}
</script>

<style lang="sass" scoped>
  .c-row
    height: 100%
    background-color: var(--v-secondary-base)
</style>
