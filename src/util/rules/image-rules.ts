import { baseImageLimitInstance } from "@/constants/image/image-limit"
import { validatorInstance } from "../validate"
import { ImageFieldArrayItem } from "@/interfaces/form/question-form"

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
