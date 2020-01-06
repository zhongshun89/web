const url = {
  password: `/api/account/auth/updatePassword/`
}

export const state = () => ({
})

export const getters = {
}

export const mutations = {
}

export const actions = {
  async updatePassword ({ commit, dispatch }, data) {
    await this.$axios.$post(url.password, data)
  }
}
