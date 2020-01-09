import { UPDATE_PASSWORD_URL, RETRIEVE_PASSWORD_URL, RESET_PASSWORD_URL } from '~/public/api'

export default function ({ $axios, store }) {
  $axios.onResponse((response) => {
    const ignoreUrlList = [
      '/api/token_auth/',
      UPDATE_PASSWORD_URL,
      RETRIEVE_PASSWORD_URL,
      RESET_PASSWORD_URL
    ]
    if (response.config.method !== 'get') {
      if (!ignoreUrlList.includes(response.config.url)) {
        store.dispatch('notices/pushInfo', response)
      }
    }
  })
}
