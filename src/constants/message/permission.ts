export const PERMISSION_MESSAGE = {
  granted: "푸시 알림 수신을 허용하셨습니다",
  denied: "푸시 알림 수신을 거부하셨습니다",
} satisfies Record<Exclude<NotificationPermission, "default">, string>
