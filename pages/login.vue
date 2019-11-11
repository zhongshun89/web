<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="3"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title class="headline">
              三宝管理系统
            </v-toolbar-title>
          </v-toolbar>
          <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
            <v-card-text>
              <form @submit.prevent="passes(login)">
                <ValidationProvider v-slot="{ errors }" name="用户名" rules="required|max:10">
                  <v-text-field
                    v-model="username"
                    prepend-icon="mdi-account"
                    label="名称"
                  />
                  <p class="red--text caption message">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="密码" rules="required|min:6">
                  <v-text-field
                    v-model="password"
                    prepend-icon="mdi-lock"
                    label="密码"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                  />
                  <p class="red--text caption message">
                    {{ errors[0] }}
                  </p>
                </ValidationProvider>
              </form>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1" />
              <v-btn color="primary" @click="reset">
                重置
              </v-btn>
              <v-btn :disabled="invalid" color="primary" @click.prevent="passes(login)">
                登入
              </v-btn>
            </v-card-actions>
          </ValidationObserver>
        </v-card>
      </v-col>
    </v-row>
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
      }).catch((error) => {
        console.log(error)
      })
    },
    reset () {
      this.username = ''
      this.password = ''
      this.$refs.observer.reset()
    }
  }
}
</script>

<style lang="sass" scoped>
  .message
    margin-left: 2rem
</style>
