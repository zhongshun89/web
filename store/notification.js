import cloneDeep from 'lodash.clonedeep'

export const state = () => ({
  messageList: [],
  timeout: 2500,
  options: {
    icon: '/wc.png',
    renotify: true,
    vibrate: [100, 50, 100],
    actions: [{ action: 'command-action', title: '查看' }]
  }
})

export const getters = {
  message (state) {
    return state.messageList ? state.messageList[state.messageList.length - 1] : null
  }
}

export const mutations = {
  push (state, message) {
    state.messageList.push(message)
  },
  shift (state) {
    state.messageList.shift()
  }
}
export const actions = {
  notify ({ state, commit, dispatch }, data) {
    const options = cloneDeep(state.options)
    if (data.isVoidAction) {
      options.actions = []
    }
    options.body = data.body
    options.data = data.data
    options.tag = data.tag
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        navigator.serviceWorker.getRegistration().then((reg) => {
          reg.showNotification(data.title, options)
        })
      }
    })
  }
}
