"use client"

import Tab from "@/components/shared/tab/Tab"
import { UserPayload } from "@/interfaces/dto/member/get-member.dto"
import { useState } from "react"
import UserProfileSection from "./UserProfileSection"
import Button from "@/components/shared/button/Button"
import Spacing from "@/components/shared/Spacing"
import { useClientSession } from "@/hooks/useClientSession"
import { Icons } from "@/components/icons/Icons"
import useIntroduction from "../hooks/useIntroduction"
import { twJoin } from "tailwind-merge"
import Textarea from "@/components/shared/textarea/Textarea"
import { buttonMessage, notificationMessage } from "@/constants/message"
import { useForm } from "react-hook-form"
import type { IntroductionValue } from "../hooks/useIntroduction.types"

interface UserProfileMenuProps {
  userPayload: UserPayload
}

type MenuKey = "Introduction"

function UserProfileMenu({ userPayload }: UserProfileMenuProps) {
  const { user } = useClientSession()
  const isMyPage = userPayload.id === user?.member_id
  const [menu, setMenu] = useState<MenuKey>("Introduction")
  const { handleEditMode } = useIntroduction()

  const MenuContent = () => {
    switch (menu) {
      case "Introduction":
        return (
          <Introduction
            introduction={userPayload.introduction}
            isMyPage={isMyPage}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <Tab
        classNames={{
          wrapper:
            "h-[52px] sticky top-[calc(var(--height-header)+66px)] sm:top-[calc(var(--height-header))] -mx-[1px]  overflow-hidden",
          tab: "flex-1 w-auto",
        }}
        onTab={(label) => setMenu(label as MenuKey)}
        tabs={[
          {
            label: "Introduction",
            content: (
              <div className="flex w-full h-full justify-center mt-2">
                <Button>README.md</Button>
                {isMyPage && (
                  <Icons.EditIntro
                    className="ml-[2px] text-[16px] mt-[6px] hrink-0 cursor-pointer"
                    onClick={handleEditMode}
                  />
                )}
              </div>
            ),
            active: menu === "Introduction",
          },
        ]}
      />
      <Spacing size={16} />
      {/* menu content */}
      <UserProfileSection className="bg-white border-none shadow-none p-0">
        <MenuContent />
      </UserProfileSection>
    </>
  )
}

export default UserProfileMenu

UserProfileMenu.MenuContentWrapper = function MenuContentWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[calc(581px+(100dvh-806px))] sm:min-h-[calc(584px+(100dvh-732px))]">
      <div className="bg-white rounded-lg border border-colorsGray h-max p-4">
        {children}
      </div>
    </div>
  )
}

interface IntroductionProps {
  introduction?: string
  isMyPage: boolean
}

function Introduction({ introduction, isMyPage }: IntroductionProps) {
  const { closeEditMode, handleSubmitIntroduction, isEditMode } =
    useIntroduction()

  const { handleSubmit, register } = useForm<IntroductionValue>({
    defaultValues: { intro: introduction },
  })

  const [textLen, setTextLen] = useState(introduction?.length ?? 0)

  const styleWithWarning = twJoin([textLen > 300 && "text-[#EF4040]"])

  if (!introduction) {
    return (
      <UserProfileMenu.MenuContentWrapper>
        <span className="font-bold text-colorsGray text-center block">
          {notificationMessage.noIntroduction}
        </span>
      </UserProfileMenu.MenuContentWrapper>
    )
  }

  if (isMyPage && isEditMode)
    return (
      <UserProfileMenu.MenuContentWrapper>
        <div>
          <form
            className="w-full"
            onSubmit={handleSubmit(handleSubmitIntroduction)}
          >
            <Textarea
              fullWidth={true}
              rows={5}
              {...register("intro", {
                onChange: (e) => setTextLen(e.target.value.length),
              })}
            />
            <div className="text-right">
              <span className={styleWithWarning}>{textLen}</span>
              /300
            </div>
            <div className="flex justify-center mt-[20px]">
              <Button
                buttonTheme="third"
                className="w-[70px] mr-[10px]"
                onClick={closeEditMode}
              >
                {buttonMessage.cancle}
              </Button>
              <Button buttonTheme="primary" className="w-[70px]" type="submit">
                {buttonMessage.save}
              </Button>
            </div>
          </form>
        </div>{" "}
      </UserProfileMenu.MenuContentWrapper>
    )

  return (
    <UserProfileMenu.MenuContentWrapper>
      <p className="whitespace-pre-wrap">{introduction}</p>
    </UserProfileMenu.MenuContentWrapper>
  )
}
