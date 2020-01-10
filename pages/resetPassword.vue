<template>
  <v-row class="c-row" align="center" justify="center">
    <v-col cols="2">
      <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
        <form @submit.prevent="passes(submit)">
          <ValidationProvider v-slot="{ errors }" name="newPassword" rules="required|min:6">
            <v-text-field
              v-model="newPassword"
              dark
              label="新密码"
            />
            <p class="error--text caption">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="confirmPassword" rules="required|confirmed:newPassword">
            <v-text-field
              v-model="confirmPassword"
              dark
              label="确认新密码"
            />
            <p class="error--text caption">
              {{ errors[0] }}
            </p>
          </ValidationProvider>
        </form>
        <v-btn
          class="c-row__btn"
          rounded
          width="100%"
          color="white"
          :disabled="invalid"
          @click.prevent="passes(submit)"
        >
          下一步
        </v-btn>
      </ValidationObserver>
    </v-col>
  </v-row>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, min, confirmed } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN'
import { mapActions } from 'vuex'

const moduleName = 'account'

export default {
  auth: 'guest',
  layout: 'prompt',
  validate ({ query }) {
    return query.userId && query.token
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      newPassword: '',
      confirmPassword: ''
    }
  },
  computed: {
    messages () {
      zh.messages.required = '该密码是必须的'
      zh.messages.min = '该密码必须至少有{length}个字符'
      zh.messages.confirmed = '两次输入的密码不匹配'
      return zh.messages
    }
  },
  created () {
    extend('required', {
      ...required,
      message: this.messages.required
    })
    extend('min', {
      ...min,
      message: this.messages.min
    })
    extend('confirmed', {
      ...confirmed,
      message: this.messages.confirmed
    })
  },
  methods: {
    ...mapActions(moduleName, [
      'resetPassword'
    ]),
    async submit () {
      const data = {
        user_id: this.$route.query.userId,
        password: this.confirmPassword
      }
      await this.$auth.setUserToken(this.$route.query.token)
      await this.resetPassword(data).then(() => {
        this.$auth.logout()
      })
    },
    reset () {
      this.newPassword = ''
      this.confirmPassword = ''
      this.$refs.observer.reset()
    }
  }
}
</script>

<style lang="sass" scoped>
  .c-row
    height: 100%
    background-color: var(--v-secondary-base)
    &__btn
      margin-top: 15%
</style>
