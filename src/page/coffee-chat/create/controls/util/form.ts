import { CoffeeChatFormData } from "@/interfaces/form"
import { FieldError, FieldErrors, Merge } from "react-hook-form"

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

export function pickError(errors: FieldErrors<CoffeeChatFormData>): ErrorType {
  return (errors?.title ??
    errors?.introduction ??
    errors?.content ??
    errors?.hashTags ??
    errors?.dateTimes ??
    errors?.root)!
}
