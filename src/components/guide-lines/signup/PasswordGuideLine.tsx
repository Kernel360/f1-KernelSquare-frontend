"use client"

import GuideLineBulletLabel from "@/components/shared/input/GuideLineBulletLabel"
import Guideline from "@/components/shared/input/Guideline"
import { validPasswordSpecialList, validatorInstance } from "@/util/validate"

interface PasswordGuideLineProps {
  password: string
}

function PasswordGuideLine({ password }: PasswordGuideLineProps) {
  const { format, length } = validatorInstance.validatePassword(password)
  const { noSpace } = validatorInstance

  return (
    <Guideline
      open={true}
      guildeline={[
        {
          label: ({ valid }) => (
            <GuideLineBulletLabel valid={valid}>
              영문 소문자 / 영문 대문자 / 숫자 / 특수문자{" "}
              {validPasswordSpecialList.join("")} 각 1자 이상 포함
            </GuideLineBulletLabel>
          ),
          valid: format(),
        },
        {
          label: ({ valid }) => (
            <GuideLineBulletLabel valid={valid}>
              8자 이상 16자 이하 입력(공백제외)
            </GuideLineBulletLabel>
          ),
          valid: length() && noSpace(password),
        },
      ]}
    />
  )
}

export default PasswordGuideLine
