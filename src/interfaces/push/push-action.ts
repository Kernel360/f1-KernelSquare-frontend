import { NotificationType } from "./push-type"

export interface NotificationAction {
  action: NotificationType
  title: string
}

export type NotificationActions = NotificationAction[]
