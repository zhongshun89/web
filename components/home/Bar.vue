<template>
  <v-app-bar
    app
    color="bar"
    flat
  >
    <v-toolbar-title class="tertiary--text font-weight-light align-self-center">
      <v-btn icon @click.stop="toggleDrawer">
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
      {{ title }}
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-row align="center" class="mx-0">
        <v-text-field
          class="mr-4 purple-input"
          color="purple"
          label="搜索..."
          hide-details
        />
        <v-btn icon to="/">
          <v-icon color="tertiary">
            mdi-view-dashboard
          </v-icon>
        </v-btn>
        <v-menu
          bottom
          left
          offset-y
          transition="slide-y-transition"
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              class="toolbar-items"
              icon
              to="/notifications"
              v-bind="attrs"
              v-on="on"
            >
              <v-badge color="error" overlap>
                <template slot="badge">
                  {{ notifications.length }}
                </template>
                <v-icon color="tertiary">
                  mdi-bell
                </v-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-card>
            <v-list dense>
              <v-list-item
                v-for="notification in notifications"
                :key="notification"
              >
                <v-list-item-title v-text="notification" />
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
        <v-btn to="/user-profile" icon>
          <v-icon color="tertiary">
            mdi-account
          </v-icon>
        </v-btn>
      </v-row>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      notifications: [
        'Mike, John responded to your email',
        'You have 5 new tasks',
        'You\'re now a friend with Andrew',
        'Another Notification',
        'Another One'
      ],
      title: '首页'
    }
  },
  watch: {
    '$route' (val) {
      if (val.name === 'index') {
        this.title = '首页'
      }
    }
  },
  methods: {
    ...mapMutations([
      'toggleDrawer'
    ])
  }
}
</script>

<style lang="sass" scoped>
</style>
