import { set, toggle } from '~/utils/vuex'

export const state = () => ({
  drawer: null,
  linkText: '',
  search: '',
  wsConnect: false,
  message: null
})

export const getters = {

}

export const mutations = {
  // SOCKET_CONNECT (state, status) {
  //   console.log('socketio connect!')
  //   state.wsConnect = true
  // },
  // SOCKET_MY_RESPONSE (state, message) {
  //   console.log('socketio message:', message)
  //   state.message = message
  // },
  setDrawer: set('drawer'),
  toggleDrawer: toggle('drawer'),
  setLinkText (state, value) {
    state.linkText = value
  },
  setSearch (state, value) {
    state.search = value
  },
  emptySearch (state) {
    state.search = ''
  },
  reset (state) {
    state.search = ''
  }
}

export const actions = {

}
