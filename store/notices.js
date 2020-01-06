import sleep from 'sleep-promise'
import { genNoticeText } from '~/utils/vuex'
import { INFO, ERROR } from '~/public/constants'

export const state = () => ({
  notices: [],
  active: false
})

export const getters = {
  firstNotice (state) {
    return state.notices.length ? state.notices[0] : null
  }
}

export const mutations = {
  pushInfo (state, notice) {
    state.notices.push({ type: INFO, text: notice })
  },
  pushError (state, notice) {
    state.notices.push({ type: ERROR, text: notice })
  },
  removeFirstNotice (state) {
    state.notices.shift()
  },
  active (state) {
    state.active = true
  },
  deActive (state) {
    state.active = false
  }
}

export const actions = {
  pushInfo ({ commit, dispatch }, response) {
    commit('pushInfo', genNoticeText(response))
    dispatch('active')
  },
  pushError ({ commit, dispatch }, response) {
    commit('pushError', genNoticeText(response))
    dispatch('active')
  },
  removeFirstNotice ({ commit }) {
    commit('removeFirstNotice')
    commit('deActive')
  },
  async active ({ state, commit }) {
    while (state.active) {
      await sleep(1000)
    }
    commit('active')
  }
}
