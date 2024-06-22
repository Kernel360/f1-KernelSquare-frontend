import { APIResponse } from "../api-response"

// 'answer' | 'rank' | 'coffeeChatRequest'
// 현재는 answer만 가능
export type NotificationType = "answer"

export type FcmNotificationData<TData extends NotificationType> = {
  answer: { postId: string; questionAuthorId: string }
}[TData]

export type FcmNotification<TData extends NotificationType> = {
  title: string
  body: string
  imageUrl?: string
  icon?: string
  data: FcmNotificationData<TData>
}

export interface SendFcmRequest<TData extends NotificationType> {
  notification: FcmNotification<TData>
}

export interface SendFcmResponse extends APIResponse {}
