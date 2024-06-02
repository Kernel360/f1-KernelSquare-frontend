import {
  ImageLimits,
  baseImageLimitInstance,
} from "@/constants/image/image-limit"
import { ImageRuleValidateType } from "./rules/image-rules"

export class ImageValidator {
  static instance: ImageValidator
  private limits: ImageLimits = baseImageLimitInstance

  constructor({ limits }: { limits?: ImageLimits } = {}) {
    if (ImageValidator.instance) return ImageValidator.instance

    if (limits) {
      this.limits = limits
    }

    ImageValidator.instance = this
  }

  validate(fileBlob: File | Blob) {
    const validateAcceptResult = this.validateAccept(fileBlob)
    if (validateAcceptResult !== true) {
      return validateAcceptResult
    }

    const validateSizeResult = this.validateSize(fileBlob)
    if (validateSizeResult !== true) {
      return validateSizeResult
    }

    return true
  }

  validateAccept(fileBlob: File | Blob) {
    if (!this.limits.accept.includes(fileBlob.type as any)) {
      return {
        type: ImageRuleValidateType.InvalidFormat,
        message: `이미지는 ${this.limits.getAcceptListLabel()} 확장자만 가능합니다`,
      }
    }

    return true
  }

  validateSize(fileBlob: File | Blob) {
    if (fileBlob.size > this.limits.getSize()) {
      return {
        type: ImageRuleValidateType.MaximumSize,
        message: `${this.limits.getSizeLabel()} 이하의 이미지만 업로드할 수 있습니다`,
      }
    }

    return true
  }
}

export const imageValidatorInstance = new ImageValidator()
