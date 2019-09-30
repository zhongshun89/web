<template>
  <v-container>
    <ValidationObserver v-slot="{ invalid, passes }">
      <form @submit.prevent="passes(login)">
        <ValidationProvider v-slot="{ errors }" name="username" rules="required|max:10">
          <v-text-field
            v-model="username"
            label="名称"
          />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" name="password" rules="required|min:6">
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
extend('required', required)
extend('max', max)
extend('min', min)

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
      this.$validator.validateAll((valid) => {
        if (valid) {
          this.error = null
          return this.$auth.loginWith('local', {
            data: {
              username: this.username,
              password: this.password
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
