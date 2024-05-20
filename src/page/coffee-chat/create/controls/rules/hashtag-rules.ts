import Limitation from "@/constants/limitation"
import { validationMessage } from "@/constants/message/validation"
import { CoffeeChatFormData, HashTagFormData } from "@/interfaces/form"
import { validatorInstance } from "@/util/validate"
import { ControllerRenderProps, RegisterOptions } from "react-hook-form"

type HashTagRules = Omit<
  RegisterOptions<HashTagFormData, "hashTag">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

export type HashTagListField = ControllerRenderProps<
  CoffeeChatFormData,
  "hashTags"
>

export const enum HashTagRuleValidateType {
  "InvalidFormat" = "invalidFormat",
  "WhiteSpace" = "invalidWhiteSpace",
}

export const enum HashTagListRuleValidateType {
  "Duplicate" = "duplicate",
  "Maximum" = "maximum",
}

export const hashTagRules: ({
  hashTagList,
}: {
  hashTagList: string[]
}) => HashTagRules = ({ hashTagList }) => {
  return {
    required: validationMessage.noValue,
    maxLength: {
      value: Limitation.hashtags_word,
      message: validationMessage.overHashtagWordLimit,
    },
    validate: {
      [HashTagRuleValidateType.InvalidFormat]: (hashTag) => {
        if (validatorInstance.validateHashTag(hashTag).format()) {
          return true
        }

        return validationMessage.preventSpecialCharacter
      },
      [HashTagRuleValidateType.WhiteSpace]: (hashTag) => {
        if (validatorInstance.validateHashTag(hashTag).whiteSpace()) {
          return true
        }

        return "해시태그는 공백만 포함할 수 없습니다."
      },
      [HashTagListRuleValidateType.Duplicate]: (hashTag) => {
        if (
          validatorInstance.validateHashTagList(hashTagList).duplicate(hashTag)
        ) {
          return true
        }

        return validationMessage.preventDuplicateValue
      },
      [HashTagListRuleValidateType.Maximum]: (hashTag) => {
        if (validatorInstance.validateHashTagList(hashTagList).length()) {
          return true
        }

        return validationMessage.overHashtagCntLimit
      },
    },
  }
}
