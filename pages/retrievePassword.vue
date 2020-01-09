<template>
  <v-row class="c-row" align="center" justify="center">
    <v-col cols="3" class="text-center">
      <v-progress-circular
        v-if="loading"
        :size="50"
        class="text-center c-row__text"
        color="white"
        indeterminate
      ></v-progress-circular>
      <p v-show="success" class="text-center title white--text c-row__text">发送成功，请登入邮箱查看。</p>
      <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
        <ValidationProvider v-slot="{ errors }" name="邮箱" rules="required|email">
          <v-text-field
            v-model="email"
            dark
            label="请输入注册邮箱地址"
            hide-details
            single-line
            append-icon="mdi-arrow-right-thick"
            @click:append="passes(next)"
          />
          <p class="error--text caption mt-4 text-left">
            {{ errors[0] }}
          </p>
        </ValidationProvider>
      </ValidationObserver>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN'

const moduleName = 'account'

export default {
  auth: false,
  layout: 'prompt',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      email: '',
      success: false,
      loading: false
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
    ...mapActions(moduleName, [
      'retrievePassword'
    ]),
    next () {
      this.loading = true
      this.success = false
      this.retrievePassword({
        email: this.email
      }).then((res) => {
        this.loading = false
        this.success = true
      })
    }
  }
}
</script>

<style lang="sass" scoped>
  .c-row
    height: 100%
    background-color: var(--v-secondary-base)
    &__text
      margin-bottom: 10%
</style>
