import cloneDeep from 'lodash.clonedeep'
import { genUrl } from '~/utils/vuex'
import { USERS_URL } from '~/public/api'

export const state = () => ({
  users: [],
  loading: false,
  count: 0,
  pagination: {}
})

export const mutations = {
  updateUsers (state, value) {
    state.users = value.results
    state.count = value.count
  },
  setLoading (state, value) {
    state.loading = value
  },
  setPagination (state, value) {
    state.pagination = cloneDeep(value)
  },
  reset (state) {
    state.users = []
    state.loading = false
    state.count = 0
    state.pagination = {}
  }
}

export const actions = {
  async fetch ({ state, rootState, commit }) {
    const options = cloneDeep(state.pagination)
    options.search = rootState.search
    const url = genUrl(USERS_URL, options)
    commit('setLoading', true)
    await this.$axios.$get(url).then((res) => {
      commit('setLoading', false)
      console.log('res:', res)
      commit('updateUsers', res)
    })
  },
  async create ({ rootState, dispatch }, data) {
    await this.$axios.$post(USERS_URL, data)
      .then(() => {
        dispatch('fetch')
      })
  },
  async update ({ rootState, dispatch }, data) {
    const url = `${USERS_URL}${data.id}/`
    await this.$axios.$put(url, data)
      .then(() => {
        dispatch('fetch')
      })
  },
  async remove ({ commit, dispatch }, data) {
    const url = `${USERS_URL}${data.id}/`
    await this.$axios.$delete(url)
      .then(() => {
        dispatch('fetch')
      })
  }
}
