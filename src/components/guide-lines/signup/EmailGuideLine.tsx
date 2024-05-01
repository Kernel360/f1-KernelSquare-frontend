"use client"

import GuideLineBulletLabel from "@/components/shared/input/GuideLineBulletLabel"
import Guideline from "@/components/shared/input/Guideline"
import { duplicateState } from "@/recoil/atoms/duplicate"
import { validatorInstance } from "@/util/validate"
import { useRecoilValue } from "recoil"

interface EmailGuideLineProps {
  email: string
}

function EmailGuideLine({ email }: EmailGuideLineProps) {
  const signupDuplicate = useRecoilValue(duplicateState)

  const { format, length } = validatorInstance.validateEmail(email)

  return (
    <Guideline
      open={true}
      guildeline={[
        {
          label: ({ valid }) => (
            <GuideLineBulletLabel valid={valid}>
              이메일 형식(ex. example@email.com)
            </GuideLineBulletLabel>
          ),
          valid: format(),
        },
        {
          label: ({ valid }) => (
            <GuideLineBulletLabel valid={valid}>
              6자 이상 40자 이하 입력(공백제외)
            </GuideLineBulletLabel>
          ),
          valid: length(),
        },
        {
          label: ({ valid }) => (
            <GuideLineBulletLabel valid={valid}>
              사용중이지 않은 이메일
            </GuideLineBulletLabel>
          ),
          valid:
            signupDuplicate.email.checkedDuplicate &&
            !signupDuplicate.email.isDuplicate,
        },
      ]}
    />
  )
}

export default EmailGuideLine
