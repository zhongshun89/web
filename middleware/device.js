export default function ({ app, route, redirect }) {
  if (app.$device.isMobile && route.path !== '/phone') {
    return redirect({ path: '/phone' })
  }
}
