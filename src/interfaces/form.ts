export interface LoginFormData {
  email: string
  password: string
}

// signup
export interface SignupFormData {
  email: string
  nickname: string
  image_url?: string
  password: string
}

export interface SignupHookFormData extends SignupFormData {
  passwordCheck: string
}

// answer
export interface AnswerFormData {
  answer: string
}

// comment
export interface CommentFormData {
  comment: string
}

export interface CommentUpdateFormData {
  commentForUpdate: string
}

// coffee chat
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

// hashtag
type HashTag = string

export interface HashTagFormData {
  hashTag: HashTag
}
