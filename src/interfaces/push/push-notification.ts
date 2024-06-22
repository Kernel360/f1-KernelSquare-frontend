import { FcmNotificationData, NotificationType } from "../dto/fcm/send-fcm.dto"
import { NotificationActions } from "./push-action"

export interface AppPushNotification extends Notification {
  click_action?: string
  actions?: NotificationActions
}

export type AppPushNotificationData = Omit<
  FcmNotificationData<"answer">,
  "questionAuthorId"
>

export type AppNotificationClickData = AppPushNotificationData & {
  type: NotificationType
  click_action?: string
}

export interface AppPushNotificationDataJSON {
  data: AppPushNotificationData
  notification: AppPushNotification
  fcmMessageId: string
  priority: string
}
