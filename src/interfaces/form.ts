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
