self.addEventListener('notificationclick', (event) => {
  event.notification.close()
}, false)
