import { USER_PROFILE_LIMITS } from "@/constants/limitation"
import { IntroductionFormData } from "@/interfaces/form/introduction-form"
import { RegisterOptions } from "react-hook-form"

type IntroductionRules = Omit<
  RegisterOptions<IntroductionFormData, "introduction">,
  "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
>

export const introductionRules: IntroductionRules = {
  required: "자기소개를 입력해주세요",
  minLength: {
    value: USER_PROFILE_LIMITS.introduction.minLength,
    message: `자기소개는 최소 ${USER_PROFILE_LIMITS.introduction.minLength}자 이상이어야 합니다`,
  },
  maxLength: {
    value: USER_PROFILE_LIMITS.introduction.maxLength,
    message: `자기소개는 최대 ${USER_PROFILE_LIMITS.introduction.maxLength}자 이하여야 합니다`,
  },
}
