// action type
export type QuestionPageMode = "create" | "update"

// form
export type Skill = string
export type SkillFieldArrayItem = { skill: Skill }

export type ImageFieldArrayItem = { file?: File | Blob; uploadURL: string }

export interface QuestionFormData {
  title: string
  content: string
  images: ImageFieldArrayItem[]
  imagesToDelete: ImageFieldArrayItem[]
  skills: SkillFieldArrayItem[]
}

// search
export interface SearchSkillFormData {
  keyword: string
}
