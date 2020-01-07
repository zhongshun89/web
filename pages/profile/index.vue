<template>
  <v-container class="pa-0 c-container" fluid fill-height>
    <v-row class="c-container__row" align="center" justify="center">
      <v-col cols="4" class="pt-5 mt-5">
        <v-list-item two-line>
          <v-list-item-icon>
            <v-icon class="c-icon">
              mdi-account
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <p class="title">
              {{ $auth.user.username }}
            </p>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-icon>
            <v-icon class="c-icon">
              mdi-phone
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <p class="title">
              {{ $auth.user.phone }}
            </p>
          </v-list-item-content>
        </v-list-item>
        <v-list-item two-line>
          <v-list-item-icon>
            <v-icon class="c-icon">
              mdi-email
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <p class="title">
              {{ $auth.user.email }}
            </p>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="2">
        <v-list-item>
          <v-list-item-content class="py-0">
            <v-avatar
              size="150"
            >
              <img
                :src="$auth.user.avatar"
              >
            </v-avatar>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="mt-5">
          <v-list-item-content>
            <Password></Password>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <Avatar></Avatar>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Password from '~/components/profile/Password'
import Avatar from '~/components/profile/Avatar'

export default {
  components: {
    Password,
    Avatar
  },
  data () {
    return {
      reloadFlag: false
    }
  },
  methods: {}
}
</script>

<style lang="sass" scoped>
  .c-icon
    font-size: 2rem
  .c-container
    height: 80%
    &__row
      height: 100%
</style>
