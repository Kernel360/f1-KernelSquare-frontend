/// <reference lib="WebWorker" />

self.addEventListener("push", (/** @type {PushEvent} */ event) => {
  const canNotification = !!globalThis.Notification

  if (!canNotification) return
  if (Notification.permission !== "granted") return

  /** @type {import ("../src/interfaces/push/push-notification").AppPushNotificationDataJSON} */
  const { data, notification } = event.data.json()

  /** @type {ServiceWorkerRegistration} */
  const registration = event.target.registration

  event.waitUntil(
    registration.showNotification(notification.title, {
      requireInteraction: true,
      body: notification.body,
      badge: notification.badge ?? "/icons/outline-badge-icon.png",
      icon: notification.icon ?? "/icon.png",
      actions: notification.actions ?? actions[data.type],
      data: {
        ...data,
        ...(notification.click_action && {
          click_action: notification.click_action,
        }),
      },
    }),
  )
})

self.addEventListener(
  "notificationclick",
  async function (/** @type {NotificationEvent} */ event) {
    /** @type {import ('../src/interfaces/push/push-action').NotificationAction['action']} */
    const action = event.action
    /** @type {import ("../src/interfaces/push/push-notification").AppPushNotification} */
    const notification = event.notification
    /** @type {import ("../src/interfaces/push/push-notification").AppNotificationClickData} */
    const data = notification.data

    /** @type {ServiceWorkerGlobalScope} */
    const worker = event.currentTarget

    if (data.type === "answer") {
      if (action === "answer:close") return

      const linkUrl =
        data.click_action ?? `https://kernelsquare.live/question/${data.postId}`

      notification.close()

      event.waitUntil(worker.clients.openWindow(linkUrl))
    }
  },
)
