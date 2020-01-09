<template>
  <v-navigation-drawer
    v-model="inputValue"
    app
    fixed
    color="primary"
    dark
  >
    <template v-slot:img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
      />
    </template>
    <v-list-item two-line>
      <v-list-item-avatar title color="white">
        <v-img
          src="/logo.png"
        />
      </v-list-item-avatar>

      <v-list-item-title class="title">
        智慧公厕
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav>
      <v-list-item
        v-for="(link, i) in links"
        :key="`drawer_${i}`"
        exact
        :to="link.to"
        exact-active-class="primary white--text"
        @click="clickLink(link)"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-title v-text="link.text" />
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block dark color="secondary" @click="logout">
          登出
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'drawer'
    ]),
    links () {
      return [
        {
          to: '/',
          icon: 'mdi-view-dashboard',
          text: '首页'
        },
        {
          to: 'users',
          icon: 'mdi-account',
          text: '用户管理'
        }
      ]
    },
    inputValue: {
      get () {
        return this.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    }
  },
  created () {
    this.setLinkText('首页')
  },
  methods: {
    ...mapMutations([
      'setDrawer',
      'setLinkText'
    ]),
    clickLink (link) {
      this.setLinkText(link.text)
    },
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
