<template>
  <v-container>
    <ValidationObserver v-slot="{ invalid, passes }">
      <form @submit.prevent="passes(login)">
        <ValidationProvider v-slot="{ errors }" name="用户名" rules="required|max:10">
          <v-text-field
            v-model="username"
            label="名称"
          />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" name="密码" rules="required|min:6">
          <v-text-field
            v-model="password"
            label="密码"
            :append-icon="showPassword ? 'visibility_off' : 'visibility'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <v-btn :disabled="invalid" color="primary" @click.prevent="passes(login)">
          登入
        </v-btn>
      </form>
    </ValidationObserver>
  </v-container>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, max, min } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN'
extend('required', {
  ...required,
  message: zh.messages.required
})
extend('max', {
  ...max,
  message: zh.messages.max
})
extend('min', {
  ...min,
  message: zh.messages.min
})

export default {
  layout: 'login',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      username: '',
      password: '',
      error: '',
      showPassword: false,
      title: '三宝管理系统'
    }
  },
  methods: {
    login () {
      return this.$auth.loginWith('local', {
        data: {
          username: this.username,
          password: this.password
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
