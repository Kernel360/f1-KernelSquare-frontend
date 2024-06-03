export interface CoffeeChatFormData {
  title: string
  content: string
  introduction: string
  dateTimes?: string[]
  hashTags?: string[]
}

export type CoffeeChatEditorInitialValues = CoffeeChatFormData

export interface UpdateCoffeeChatData extends CoffeeChatFormData {
  post_id: number
}
