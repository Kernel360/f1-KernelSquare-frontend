"use client"

import GuideLineBulletLabel from "@/components/shared/input/GuideLineBulletLabel"
import Guideline from "@/components/shared/input/Guideline"

interface PasswordCheckGuideLineProps {
  password: string
  passwordCheck: string
}

function PasswordCheckGuideLine({
  password,
  passwordCheck,
}: PasswordCheckGuideLineProps) {
  return (
    <Guideline
      open={true}
      guildeline={[
        {
          label: ({ valid }) => (
            <GuideLineBulletLabel valid={valid}>
              입력한 비밀번호와 같음
            </GuideLineBulletLabel>
          ),
          valid: !!passwordCheck && password === passwordCheck,
        },
      ]}
    />
  )
}

export default PasswordCheckGuideLine
