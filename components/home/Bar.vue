<template>
  <v-app-bar app flat color="barGrey" class="c-bar">
    <v-toolbar-title class="tertiary--text font-weight-light align-self-center">
      <v-btn icon @click.stop="toggleDrawer">
        <v-icon>mdi-view-list</v-icon>
      </v-btn>
      {{ linkText }}
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <v-row align="center" class="mx-0">
        <v-text-field
          v-model="searchInput"
          label="搜索"
          class="mr-4"
          hide-details
          single-line
          append-icon="mdi-magnify"
          @click:append="search"
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
              v-bind="attrs"
              v-on="on"
            >
              <v-badge color="error" overlap>
                <template slot="badge">
                  {{ messages.length }}
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
                v-for="(item, index) in messages"
                :key="`message_${index}`"
              >
                <v-list-item-title v-text="item" />
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
        <v-btn to="profile" icon>
          <v-icon color="tertiary">
            mdi-account
          </v-icon>
        </v-btn>
      </v-row>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      searchInput: '',
      messages: [
        'Mike, John responded to your email',
        'You have 5 new tasks',
        'You\'re now a friend with Andrew',
        'Another Notification',
        'Another One'
      ]
    }
  },
  computed: {
    ...mapState([
      'linkText'
    ])
  },
  watch: {
    '$route' (val) {
      this.searchInput = ''
      this.emptySearch()
    }
  },
  methods: {
    ...mapMutations([
      'toggleDrawer',
      'setSearch',
      'emptySearch'
    ]),
    search () {
      this.setSearch(this.searchInput)
    }
  }
}
</script>

<style lang="sass" scoped>
  .c-bar
    height: $bar-height !important
</style>
