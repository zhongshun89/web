<template>
  <v-container>
    <v-text-field
      v-model="username"
      v-validate="'required|max:10'"
      label="名称"
      data-vv-as="用户名"
      data-vv-name="username"
      :error-messages="errors.collect('username')"
    />
    <v-text-field
      v-model="password"
      v-validate.disable="'required|min:6'"
      label="密码"
      data-vv-name="password"
      data-vv-as="密码"
      :error-messages="errors.collect('password')"
      :append-icon="showPassword ? 'visibility_off' : 'visibility'"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
    />
    <v-btn color="primary" @click="login">
      登入
    </v-btn>
  </v-container>
</template>

<script>
export default {
  layout: 'login',
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
