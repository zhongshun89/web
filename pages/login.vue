<template>
  <v-content class="page">
    <v-row
      align="center"
      justify="center"
      class="page__title"
      no-gutters
    >
      <p class="display-2 white--text">
        三宝管理系统
      </p>
    </v-row>
    <v-row
      align="center"
      justify="center"
      calsss="page__form"
      no-gutters
    >
      <v-col
        cols="3"
      >
        <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
          <form class="px-1 page__form__input" @submit.prevent="passes(login)">
            <ValidationProvider v-slot="{ errors }" name="用户名" rules="required|max:10">
              <v-text-field
                v-model="username"
                dark
                label="用户名"
              />
              <p class="error--text caption">
                {{ errors[0] }}
              </p>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="密码" rules="required|min:6">
              <v-text-field
                v-model="password"
                dark
                label="密码"
                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              />
              <p class="error--text caption">
                {{ errors[0] }}
              </p>
            </ValidationProvider>
          </form>
          <v-btn
            rounded
            width="100%"
            @click.prevent="passes(login)"
          >
            登入
          </v-btn>
        </ValidationObserver>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" class="page__help">
      <v-btn
        color="white"
        text
        small
        to="/retrievePassword"
      >
        忘记密码
      </v-btn>
    </v-row>
  </v-content>
</template>

<script>
import { mapActions } from 'vuex'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, max, min } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN'

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
      showPassword: false
    }
  },
  created () {
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
  },
  methods: {
    ...mapActions('notices', [
      'pushError'
    ]),
    async login () {
      await this.$auth.loginWith('local', {
        data: {
          username: this.username,
          password: this.password
        }
      }).catch((error) => {
        this.pushError(error.response)
      })
    },
    reset () {
      this.username = ''
      this.password = ''
      // this.error = ''
      this.$refs.observer.reset()
    }
  }
}
</script>

<style lang="sass" scoped>
  .page
    overflow: hidden !important
    background: url('/login-bg2.png') center no-repeat
    background-size: 100% 100%
    &__title
      height: 38%
    &__form
      height: 62%
      &__input
        padding-bottom: 10%
    &__help
      margin-top: 5%
</style>
