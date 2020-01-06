export default function ({ $axios, store }) {
  $axios.onError((error) => {
    if (error.response.config.url !== '/api/token_auth/') {
      store.dispatch('notices/pushError', error.response)
    }
  })
  $axios.onResponse((response) => {
    if (response.config.method !== 'get') {
      if (response.config.url !== '/api/token_auth/') {
        store.dispatch('notices/pushInfo', response)
      }
    }
  })
}
