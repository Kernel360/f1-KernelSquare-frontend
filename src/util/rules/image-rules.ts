import { baseImageLimitInstance } from "@/constants/image/image-limit"
import { ImageFieldArrayItem } from "@/interfaces/form/question-form"
import { imageValidatorInstance } from "../image-validate"

export const enum ImageRuleValidateType {
  "InvalidFormat" = "invalidFormat",
  "MaximumSize" = "maximumSize",
}

export const enum ImagesRuleValidateType {
  "MaxLength" = "maxLength",
}

export const imageRules = {
  validate: {
    [ImageRuleValidateType.InvalidFormat]: (file: File) => {
      const validateResult = imageValidatorInstance.validateAccept(file)
      if (validateResult !== true) {
        return validateResult.message
      }

      return true
    },
    [ImageRuleValidateType.MaximumSize]: (file: File) => {
      const validateResult = imageValidatorInstance.validateSize(file)
      if (validateResult !== true) {
        return validateResult.message
      }

      return true
    },
  },
}

export const imagesRules = {
  validate: {
    [ImagesRuleValidateType.MaxLength]: (images: ImageFieldArrayItem[]) => {
      if (images.length >= baseImageLimitInstance.maximumLength) {
        return `업로드 이미지는 ${baseImageLimitInstance.maximumLength}개 까지 가능합니다`
      }

      return true
    },
  },
}
