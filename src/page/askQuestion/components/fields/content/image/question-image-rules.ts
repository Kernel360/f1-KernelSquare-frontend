import { baseImageLimitInstance } from "@/constants/image/image-limit"
import { QUESTION_LIMITS } from "@/constants/limitation"
import {
  ImageFieldArrayItem,
  QuestionFormData,
} from "@/interfaces/form/question-form"
import { validatorInstance } from "@/util/validate"
import { UseFieldArrayProps } from "react-hook-form"

type QuestionImageFieldArrayRules = NonNullable<
  UseFieldArrayProps<QuestionFormData, "images", "id">["rules"]
>

export const enum ImageRuleValidateType {
  "InvalidFormat" = "invalidFormat",
  "MaximumSize" = "maximumSize",
}

export const enum ImagesRuleValidateType {
  "MaxLength" = "maxLength",
}

export const questionImageRules = {
  validate: {
    [ImageRuleValidateType.InvalidFormat]: (file: File) => {
      if (!validatorInstance.validateImageFileBlob(file).accept()) {
        return `이미지는 ${baseImageLimitInstance.getAcceptListLabel()} 확장자만 가능합니다`
      }

      return true
    },
    [ImageRuleValidateType.MaximumSize]: (file: File) => {
      if (!validatorInstance.validateImageFileBlob(file).size()) {
        return `${baseImageLimitInstance.getSizeLabel()} 이하의 이미지만 업로드할 수 있습니다`
      }

      return true
    },
  },
}

export const questionImagesRules = {
  validate: {
    [ImagesRuleValidateType.MaxLength]: (images: ImageFieldArrayItem[]) => {
      if (images.length >= QUESTION_LIMITS.image.maxLength) {
        return `업로드 이미지는 ${QUESTION_LIMITS.image.maxLength}개 까지 가능합니다`
      }

      return true
    },
  },
}

export const questionImageFieldArrayRules: QuestionImageFieldArrayRules = {
  maxLength: {
    value: QUESTION_LIMITS.image.maxLength,
    message: `업로드 이미지는 ${QUESTION_LIMITS.image.maxLength}개 까지 가능합니다`,
  },
}
