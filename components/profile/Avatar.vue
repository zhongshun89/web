<template>
  <v-dialog max-width="20%" v-model="dialog" persistent>
    <template v-slot:activator="{ on }">
      <v-btn color="primary" v-on="on">
        上传头像
      </v-btn>
    </template>
    <v-card class="pb-3">
      <v-card-title>
        上传头像
      </v-card-title>
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
              <v-file-input
                prepend-icon="mdi-account"
                v-model="avatar"
                show-size
                accept="image/*"
                :rules="avatarRules"
                label="头像"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1" />
        <v-btn color="primary" @click.prevent="close">
          取消
        </v-btn>
        <v-btn color="primary" :disabled="invalid" @click.prevent="submit">
          确定
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

const moduleName = 'account'

export default {
  data () {
    return {
      dialog: false,
      avatar: null
    }
  },
  computed: {
    avatarRules () {
      return [ value => !value || value.size < 2000000 || '头像不能大于2M!' ]
    },
    invalid () {
      return !this.avatar || this.avatar.size > 2000000
    }
  },
  methods: {
    ...mapActions('notices', [
      'pushError'
    ]),
    ...mapActions(moduleName, [
      'updateAvatar'
    ]),
    async submit () {
      console.log('avatar:', this.avatar)
      const data = {
        id: this.$auth.user.id,
        avatar: this.avatar
      }
      await this.updateAvatar(data).then((res) => {
        this.$auth.fetchUser()
        this.close()
      }).catch((error) => {
        this.pushError(error.response)
      })
    },
    close () {
      this.avatar = null
      this.dialog = false
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
