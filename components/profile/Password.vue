<template>
  <v-dialog v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">
        修改密码
      </v-btn>
    </template>
    <v-card class="pb-3">
      <v-card-title>
        修改密码
      </v-card-title>
      <ValidationObserver ref="observer" v-slot="{ invalid, passes }">
        <v-card-text>
          <v-container
            class="pa-0"
            fluid
          >
            <v-row
              align="center"
              justify="center"
              calsss="form"
              no-gutters
            >
              <v-col>
                <form @submit.prevent="passes(submit)">
                  <ValidationProvider v-slot="{ errors }" name="oldPassword" rules="required|min:6">
                    <v-text-field
                      v-model="oldPassword"
                      autofocus
                      label="老密码"
                    />
                    <p class="error--text caption">
                      {{ errors[0] }}
                    </p>
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" name="newPassword" rules="required|min:6">
                    <v-text-field
                      v-model="newPassword"
                      label="新密码"
                    />
                    <p class="error--text caption">
                      {{ errors[0] }}
                    </p>
                  </ValidationProvider>
                  <ValidationProvider v-slot="{ errors }" name="confirmPassword" rules="required|confirmed:password">
                    <v-text-field
                      v-model="confirmPassword"
                      label="确认新密码"
                    />
                    <p class="error--text caption">
                      {{ errors[0] }}
                    </p>
                  </ValidationProvider>
                </form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1" />
          <v-btn color="primary" @click.prevent="close">
            取消
          </v-btn>
          <v-btn color="primary" :disabled="invalid" @click.prevent="passes(submit)">
            确定
          </v-btn>
        </v-card-actions>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, min, confirmed } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN'
import { mapActions } from 'vuex'

const moduleName = 'account'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      dialog: false,
      oldPassword: '',
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
      'updatePassword'
    ]),
    async submit () {
      const updateParameter = {
        id: this.$auth.user.user,
        oldPassword: this.oldPassword,
        newPassword: this.confirmPassword
      }
      await this.updatePassword(updateParameter)
      this.close()
      await this.$auth.logout()
    },
    close () {
      this.oldPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
      this.$refs.observer.reset()
      this.dialog = false
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
