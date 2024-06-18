/**
 * @typedef {Object} AppNotification
 * @property {string} title - 알림 제목
 * @property {string} body - 알림 내용
 * @property {string} [image] - 알림에 표시할 이미지 주소
 * @property {string} [click_action] - (web push) 알림 클릭시 이동할 주소
 */

/**
 * @typedef {Object} AppNotificationData
 * @property {string} [postId] - 답변 알림시 질문 id
 * @property {string} [questionAuthorId] - 질문 작성자 id
 */

/**
 * @typedef {Object} NotificationData
 * @property {AppNotificationData} data - 알림 데이터
 * @property {string} fcmMessageId - fcm 메시지 id
 * @property {AppNotification} notification - fcm 발신 id
 * @property {string} priority - 알림 우선순위
 */

self.addEventListener("push", (event) => {
  const canNotification = !!globalThis.Notification

  if (!canNotification) return
  if (Notification.permission !== "granted") return

  /** @type {NotificationData} */
  const { data, notification } = event.data.json()

  /** @type {ServiceWorkerRegistration} */
  const registration = event.target.registration

  event.waitUntil(
    registration.showNotification(notification.title, {
      requireInteraction: true,
      body: notification.body,
      badge: "/icons/outline-badge-icon.png",
      icon: "/icon.png",
      actions: [
        {
          action: "view",
          title: "글 보기",
        },
        {
          action: "close",
          title: "알림 닫기",
        },
      ],
      data,
    }),
  )
})

/**
 * @typedef {'view' | 'close'} AppNotificationAction
 */

self.addEventListener("notificationclick", function (event) {
  /** @type {AppNotificationAction} */
  const action = event.action
  const notification = event.notification

  const data = notification.data

  const linkUrl = `${location.protocol}//${location.host}/question/${data.postId}`

  switch (action) {
    case "view":
      event.waitUntil(clients.openWindow(linkUrl))
      break
    case "close":
      break
    default:
      event.waitUntil(clients.openWindow(linkUrl))
      break
  }

  notification.close()
})
