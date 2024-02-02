import { TechTag } from "@/interfaces/tech-tag"
import type { LabelHTMLAttributes, PropsWithChildren } from "react"

export interface CoffeeChatEditorInitialValues {
  title: string
  content: string
  skills?: Array<TechTag> | null
  uploadImages?: Array<string> | null
}

export interface CoffeeChatFormData {
  title: string
  content: string
}

export type SubmitAskQuestionData = CoffeeChatFormData

export type SubmitUpdateCoffeeChatData = Omit<
  SubmitAskQuestionData,
  "member_id"
> & { post_id: number }

export interface CoffeeChatFormProps {
  initialValues?: CoffeeChatEditorInitialValues
  post_id?: number
}

export const enum TimeZone {
  AM = "AM",
  PM = "PM",
}

export interface CoffeeChatSectionProps extends NonNullable<PropsWithChildren> {
  className?: string
}

export interface CoffeeChatSectionLabelProps
  extends LabelHTMLAttributes<HTMLLabelElement> {}

export type TimeOptionsProps = { selectedDay: string; date: string[] }
