import colors from 'vuetify/lib/util/colors'
import zh from 'vuetify/es5/locale/zh-Hans'

export default {
  breakpoint: {},
  icons: {
    iconfont: 'mdi',
    values: {
    }
  },
  lang: {
    locales: { zh },
    current: 'zh'
  },
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: colors.indigo,
        secondary: colors.blue,
        accent: colors.lime,
        error: colors.red,
        warning: colors.yellow,
        info: colors.green,
        success: colors.green,
        barGrey: '#eaeaea'
      }
    }
  }
}
