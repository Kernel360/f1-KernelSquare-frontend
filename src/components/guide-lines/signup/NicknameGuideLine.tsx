"use client"

import GuideLineBulletLabel from "@/components/shared/input/GuideLineBulletLabel"
import Guideline from "@/components/shared/input/Guideline"
import { duplicateState } from "@/recoil/atoms/duplicate"
import { validatorInstance } from "@/util/validate"
import { useRecoilValue } from "recoil"

interface NicknameGuideLineProps {
  nickname: string
}

function NicknameGuideLine({ nickname }: NicknameGuideLineProps) {
  const signupDuplicate = useRecoilValue(duplicateState)

  const { format, length } = validatorInstance.validateNickname(nickname)

  return (
    <Guideline
      open={true}
      guildeline={[
        {
          label: ({ valid }) => (
            <GuideLineBulletLabel valid={valid}>
              영문대소문자 / 완전한 한글 조합(ex. 가)
            </GuideLineBulletLabel>
          ),
          valid: format(),
        },
        {
          label: ({ valid }) => (
            <GuideLineBulletLabel valid={valid}>
              2자 이상 8자 이하 입력(공백제외)
            </GuideLineBulletLabel>
          ),
          valid: length(),
        },
        {
          label: ({ valid }) => (
            <GuideLineBulletLabel valid={valid}>
              사용중이지 않은 닉네임
            </GuideLineBulletLabel>
          ),
          valid:
            signupDuplicate.nickname.checkedDuplicate &&
            !signupDuplicate.nickname.isDuplicate,
        },
      ]}
    />
  )
}

export default NicknameGuideLine
