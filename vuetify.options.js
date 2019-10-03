import colors from 'vuetify/es5/util/colors'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import Male from '~/components/svg/Male'

export default {
  breakpoint: {},
  icons: {
    iconfont: 'md',
    values: {
      male: {
        component: Male
      }
    }
  },
  lang: {
    locales: { zhHans },
    current: 'zhHans'
  },
  theme: {
    dark: false,
    themes: {
      options: {
        customProperties: true
      },
      dark: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      }
    }
  }
}
