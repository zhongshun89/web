<template>
  <v-app-bar
    app
    flat
    color="transparent"
  >
    <v-app-bar-nav-icon @click.stop="onClick"></v-app-bar-nav-icon>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />
    <v-text-field
      class="mr-4 purple-input"
      color="purple"
      label="搜索..."
      hide-details
    />
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
          <v-badge
            color="error"
            overlap
          >
            <template slot="badge">
              {{ notifications.length }}
            </template>
            <v-icon color="tertiary">
              notifications
            </v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-card>
        <v-list dense>
          <v-list-item
            v-for="notification in notifications"
            :key="notification"
            @click="onClick"
          >
            <v-list-item-title v-text="notification" />
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <v-btn
      to="/user-profile"
      icon
    >
      <v-icon color="tertiary">
        person
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

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
      title: null,
      responsive: false
    }
  },
  computed: {
    ...mapState([
      'drawer'
    ])
  },
  watch: {
    '$route' (val) {
      this.title = val.name
    }
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations([
      'setDrawer',
      'toggleDrawer'
    ]),
    onClick () {
      this.setDrawer(!this.drawer)
    },
    onResponsiveInverted () {
      this.responsive = window.innerWidth < 991
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
