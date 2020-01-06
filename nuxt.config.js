require('dotenv').config()

export default {
  mode: 'spa',

  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, minimal-ui' },
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
    '@mdi/font/css/materialdesignicons.css',
    'animate.css/animate.css'
  ],

  plugins: [
    '@/plugins/confirm',
    '@/plugins/axios'
    // {
    //   src: '~/plugins/socket.io.js',
    //   ssr: false
    // }
  ],

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/dotenv',
    ['@nuxtjs/pwa',
      {
        workbox: {
          config: { modulePathPrefix: '/workbox-v4.3.1' },
          importScripts: ['custom-sw.js']
        },
        manifest: false
      }
    ],
    ['@nuxtjs/moment', { defaultLocale: 'zh-cn', locales: ['zh-cn'] }],
    '@nuxtjs/device',
    'cookie-universal-nuxt'
  ],

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
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
      target: process.env.SERVER_HTTP_URL,
      ws: false
    },
    '/media': {
      target: process.env.SERVER_HTTP_URL,
      ws: false
    },
    '/socket': {
      target: process.env.SERVER_SOCKET_URL,
      ws: true
    }
  },

  auth: {
    localStorage: false,
    rewriteRedirects: true,
    fullPathRedirect: true,
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/token_auth/', method: 'post', propertyName: 'access' },
          logout: false,
          user: { url: '/api/users/get_auth_user/', method: 'get', propertyName: 'user' }
        }
      }
    }
  },

  router: {
    middleware: [
      'device',
      'auth'
    ]
  },

  layoutTransition: 'layout'
}
