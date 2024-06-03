import { AnswerFormData, CodingMeetingFormData } from "@/interfaces/form"
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
