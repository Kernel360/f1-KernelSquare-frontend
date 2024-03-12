import { validationMessage } from "@/constants/message/validation"
import { FieldErrors } from "react-hook-form"
import { toast } from "react-toastify"

export type BasicFormData = {
  title: string
  content: string
}

const checkFormValidation = async (errors: FieldErrors<BasicFormData>) => {
  if (errors?.title) {
    const titleErrorMessage = ((type: typeof errors.title.type) => {
      switch (type) {
        case "required":
          return validationMessage.notitle
        case "minLength":
          return validationMessage.underTitleLimit
        case "maxLength":
          return validationMessage.overTitleLimit
      }
    })(errors.title.type)

    toast.error(titleErrorMessage, {
      position: "top-center",
      toastId: "createCodingMeetingTitle",
    })

    window.scroll({
      top: 0,
      behavior: "smooth",
    })

    return
  }
  if (errors?.content) {
    const contentErrorMessage = ((type: typeof errors.content.type) => {
      switch (type) {
        case "required":
          return validationMessage.noContent
        case "minLength":
          return validationMessage.underContentLimit
        case "maxLength":
          return validationMessage.overContentLimit
      }
    })(errors.content.type)

    toast.error(contentErrorMessage, {
      position: "top-center",
      toastId: "createCodingMeetingContent",
    })
    return
  }
}

export default checkFormValidation
