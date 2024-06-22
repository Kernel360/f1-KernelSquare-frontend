import { FcmNotificationData, NotificationType } from "../dto/fcm/send-fcm.dto"

export interface AppPushNotification extends Notification {
  image?: string
  click_action?: string
}

export type AppPushNotificationData = Omit<
  FcmNotificationData<"answer">,
  "questionAuthorId"
> & {
  type: NotificationType
}

export type AppNotificationClickData = AppPushNotificationData & {
  click_action?: string
}

export interface AppPushNotificationDataJSON {
  data: AppPushNotificationData
  notification: AppPushNotification
  fcmMessageId: string
  priority: string
}
