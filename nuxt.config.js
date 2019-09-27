export default {
  mode: 'spa',

  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'apple-touch-icon', sizes: '409x624', href: '/logo.png' }
    ]
  },

  loading: { color: '#fff' },

  css: [
    'animate.css/animate.css'
  ],

  plugins: [

  ],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    ['@nuxtjs/pwa',
      {
        workbox: {
          config: { modulePathPrefix: '/workbox-v4.3.1' },
          importScripts: ['custom-sw.js']
        },
        manifest: false
      }
    ],
    ['@nuxtjs/moment'],
  ],

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: false,
    treeShake: true,
    optionsPath: './vuetify.options.js'
  },

  build: {
    extend (config, ctx) {

    }
  },

  axios: {
    proxy: true
  },

  proxy: {
    '/api': {
      target: `http://120.77.206.101:4000`,
      ws: false
    },
    '/socket': {
      target: `http://app.smartwc.cn/ws/cellphone/`,
      ws: true
    }
  },

  auth: {
    localStorage: false,
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/account/auth/cellphoneLogin/', method: 'post', propertyName: 'token' },
          user: { url: '/api/account/account/', method: 'get', propertyName: 'user' },
          logout: false
        }
      }
    }
  },

  router: {
    middleware: [
      'auth'
    ]
  },

  env: {

  }
}
