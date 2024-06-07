import { AnswerFormData, CodingMeetingFormData } from "@/interfaces/form"
import { CoffeeChatFormData } from "@/interfaces/form/coffee-chat-form"
import { FieldError, FieldErrors, FieldValues, Merge } from "react-hook-form"

type ErrorType =
  | FieldError
  | Merge<FieldError, (FieldError | undefined)[]>
  | (Record<
      string,
      Partial<{
        type: string | number
        message: string
      }>
    > &
      Partial<{
        type: string | number
        message: string
      }>)

export function pickFirstError<T extends FieldValues = FieldValues>(
  errors: FieldErrors<T>,
) {
  let errorPayload = {} as ErrorType

  for (const [field, error] of Array.from(Object.entries(errors))) {
    if (errors[field]) {
      if (field === "date") {
        const dateError = errors[
          "date"
        ] as FieldErrors<CodingMeetingFormData>["date"]

        if (dateError?.day) {
          errorPayload = dateError.day
          break
        }

        if (dateError?.start_time) {
          errorPayload = dateError.start_time[0] ?? dateError.start_time[1]!
          break
        }

        errorPayload = dateError!.end_time![0] ?? dateError!.end_time![1]!
        break
      }
      errorPayload = error as ErrorType
      break
    }
  }

  return errorPayload
}

// coffee chat
export function pickFirstCoffeeChatFormError(
  errors: FieldErrors<CoffeeChatFormData>,
) {
  const sortedKey: (keyof CoffeeChatFormData)[] = [
    "title",
    "introduction",
    "content",
    "dateTimes",
  ]

  for (const field of sortedKey) {
    const targetError = errors[field]

    if (targetError) {
      if (field === "dateTimes") {
        return { ...targetError?.root, errorField: field }
      }

      return { ...targetError, errorField: field }
    }
  }

  return null
}

// answer
export function pickFirstAnswerFormError(errors: FieldErrors<AnswerFormData>) {
  const sortedKey: (keyof AnswerFormData)[] = [
    "answer",
    "images",
    "imagesToDelete",
  ]

  for (const field of sortedKey) {
    const targetError = errors[field]

    if (targetError) return { ...targetError, errorField: field }
  }

  return null
}
