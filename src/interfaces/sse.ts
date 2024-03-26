export const enum ALERT_TYPE {
  "QUESTION_REPLY" = "QUESTION_REPLY",
  "RANK_ANSWER" = "RANK_ANSWER",
  "COFFEE_CHAT_REQUEST" = "COFFEE_CHAT_REQUEST",
}

export type AlertType = "QUESTION_REPLY" | "RANK_ANSWER" | "COFFEE_CHAT_REQUEST"

type SSEMessageType = {
  QUESTION_REPLY: {
    sender: string
    questionTitle: string
    questionId: number
  }
  RANK_ANSWER: {
    questionTitle: string
    questionId: number
    rank: number
  }
  COFFEE_CHAT_REQUEST: {
    sender: string
    senderId: number
  }
}

type SSEMessageBase<T extends AlertType> = {
  id: string
  recipient: string
  send_time: string
  alert_type: T extends "QUESTION_REPLY"
    ? "QUESTION_REPLY"
    : T extends "RANK_ANSWER"
    ? "RANK_ANSWER"
    : T extends "COFFEE_CHAT_REQUEST"
    ? "COFFEE_CHAT_REQUEST"
    : never
}

export type SSEMessage<T extends AlertType> = SSEMessageBase<T> & {
  payload: SSEMessageType[T]
}

export type SSEMessages = SSEMessageBase<any> & {
  payload: Partial<
    | SSEMessage<"QUESTION_REPLY">["payload"]
    | SSEMessage<"RANK_ANSWER">["payload"]
    | SSEMessage<"COFFEE_CHAT_REQUEST">["payload"]
  >
}
