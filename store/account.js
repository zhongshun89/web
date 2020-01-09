import objectToFormData from 'object-to-formdata'
import { UPDATE_PASSWORD_URL, USERS_URL, RETRIEVE_PASSWORD_URL, RESET_PASSWORD_URL } from '~/public/api'

export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const actions = {
  async updatePassword ({ commit, dispatch }, data) {
    await this.$axios.$post(UPDATE_PASSWORD_URL, data)
      .catch((error) => {
        dispatch('notices/pushError', error.response, { root: true })
      })
  },
  async resetPassword ({ commit, dispatch }, data) {
    await this.$axios.$post(RESET_PASSWORD_URL, data)
      .catch((error) => {
        dispatch('notices/pushError', error.response, { root: true })
      })
  },
  async retrievePassword ({ commit, dispatch }, data) {
    await this.$axios.$post(RETRIEVE_PASSWORD_URL, data)
      .catch((error) => {
        dispatch('notices/pushError', error.response, { root: true })
      })
  },
  async updateAvatar ({ commit, dispatch }, data) {
    const url = `${USERS_URL}${data.id}/update_avatar/`
    data = objectToFormData(data, { nullsAsUndefineds: true })
    await this.$axios.$put(url, data)
      .catch((error) => {
        dispatch('notices/pushError', error.response, { root: true })
      })
  }
}
