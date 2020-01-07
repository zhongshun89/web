export default function ({ $axios, store }) {
  $axios.onResponse((response) => {
    const ignoreUrlList = ['/api/token_auth/', '/api/users/set_password/']
    if (response.config.method !== 'get') {
      if (!ignoreUrlList.includes(response.config.url)) {
        store.dispatch('notices/pushInfo', response)
      }
    }
  })
}
