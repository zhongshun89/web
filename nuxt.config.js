export default {
  mode: 'spa',

  head: {},

  loading: { color: '#fff' },

  css: [
    'animate.css/animate.css'
  ],

  plugins: [
    '@/plugins/axios',
    '@/plugins/route',
    '@/plugins/echarts'
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
        // icon: false,
        // meta: false
      }
    ],
    ['@nuxtjs/moment'],
    'nuxt-i18n'
  ],
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    vueI18n: {
      locale: 'zh',
      fallbackLocale: 'en',
      silentTranslationWarn: true,
      dateTimeFormats: {
        'en': {
          short: {
            year: 'numeric', month: 'short', day: 'numeric', weekday: 'short'
          },
          long: {
            year: 'numeric', month: 'short', day: 'numeric', weekday: 'short'
          }
        },
        'zh': {
          short: {
            year: 'numeric', month: 'short', day: 'numeric', weekday: 'short'
          },
          long: {
            year: 'numeric', month: 'short', day: 'numeric', weekday: 'short'
          }
        }
      }
    },
    vueI18nLoader: true,
    detectBrowserLanguage: false,
    vuex: {
      moduleName: 'i18n',
      syncLocale: true,
      syncMessages: false,
      syncRouteParams: true
    }
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: false,
    treeShake: true,
    optionsPath: './vuetify.options.js'
  },

  build: {
    extend (config, ctx) {}
  },

  axios: {
    proxy: true
  },

  proxy: {
    '/api': {
      target: `http://120.77.206.101:4000`,
      // target: `http://127.0.0.1:4000`,
      ws: false
    },
    '/p-server-socket': {
      target: `http://app.smartwc.cn/ws/cellphone/`,
      ws: true
    },
    '/j-server-socket': {
      target: `http://smartoilets.cn/socketServer/socket`,
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
    serverHttpUrl: `https://smartoilets.cn/socketServer/front/`,
    serverHttpUrlV2: `https://smartoilets.cn/ydc/api/v2/`,
    serverSocketUrl: 'wss://smartoilets.cn/socketServer/socket',
    webSocketUrl: `wss://app.smartwc.cn/ws/cellphone/`,
    authInfo: {
      changi: {
        username: 'zadmin',
        password: '123456',
        region: 972012
      },
      achiever: {
        username: 'aadmin',
        password: '123456',
        region: 972013
      },
      dpark: {
        username: 'dadmin',
        password: '123456',
        region: 972008
      }
    }
  }
}
