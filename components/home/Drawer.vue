<template>
  <v-navigation-drawer
    v-model="inputValue"
    src="/nav-bg.jpg"
    app
    color="grey darken-2"
    dark
    floating
    persistent
  >
    <template v-slot:img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
      />
    </template>
    <v-list-item two-line>
      <v-list-item-avatar color="white">
        <v-img
          src="/logo.png"
          contain
        />
      </v-list-item-avatar>

      <v-list-item-title class="title">
        三宝管理系统
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav>
      <v-list-item
        v-for="(link, i) in links"
        :key="`drawer_${i}`"
        :to="link.to"
        active-class="primary white--text"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-title v-text="link.text" />
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn block color="accent" @click="logout">
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
    return {
      links: [
        {
          to: '/',
          icon: 'mdi-view-dashboard',
          text: '首页'
        },
        {
          to: '/users',
          icon: 'mdi-account',
          text: '用户管理'
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'drawer'
    ]),
    inputValue: {
      get () {
        return this.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    }
  },

  methods: {
    ...mapMutations([
      'setDrawer'
    ]),
    logout () {
      this.$auth.logout()
    }
  }
}
</script>
