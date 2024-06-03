"use client"

import notificationMessage from "@/constants/message/notification"
import UserProfileMenu from "../UserProfileMenu"
import dynamic from "next/dynamic"
import UpdateIntroductionForm from "./form/UpdateIntroductionForm"
import { IntroductionEditModeAtom } from "@/recoil/atoms/editor/mode"
import { useRecoilValue } from "recoil"

interface IntroductionProps {
  introduction?: string
  isMyPage: boolean
}

const IntroductionContentViewer = dynamic(
  () => import("@/components/shared/toast-ui-editor/viewer/ContentViewer"),
  {
    ssr: false,
    loading(loadingProps) {
      return <div className="skeleton h-[200px] rounded-lg" />
    },
  },
)

function Introduction({ introduction, isMyPage }: IntroductionProps) {
  const introductionEditMode = useRecoilValue(IntroductionEditModeAtom)

  if (introductionEditMode && isMyPage)
    return (
      <UserProfileMenu.MenuContentWrapper>
        <div>
          <UpdateIntroductionForm initialIntroduction={introduction} />
        </div>
      </UserProfileMenu.MenuContentWrapper>
    )

  return (
    <UserProfileMenu.MenuContentWrapper>
      <IntroductionContent introduction={introduction} />
    </UserProfileMenu.MenuContentWrapper>
  )
}

export default Introduction

const IntroductionContent = ({ introduction }: { introduction?: string }) => {
  if (!introduction) {
    return (
      <div className="flex w-full justify-center">
        <span className="text-slate-400">
          {notificationMessage.noIntroduction}
        </span>
      </div>
    )
  }

  return <IntroductionContentViewer domain="profile" content={introduction} />
}
