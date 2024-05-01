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
import Introduction from "./introduction/Introduction"

interface UserProfileMenuProps {
  userPayload: UserPayload
}

type MenuKey = "Introduction"

function UserProfileMenu({ userPayload }: UserProfileMenuProps) {
  const { user } = useClientSession()
  const isMyPage = userPayload.member_id == user?.member_id
  const [menu, setMenu] = useState<MenuKey>("Introduction")
  const { handleIntroductionEditMode } = useIntroduction()

  const MenuContent = () => {
    switch (menu) {
      case "Introduction":
        return (
          <Introduction
            introduction={userPayload.introduction}
            isMyPage={isMyPage}
            userId={user?.member_id}
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
            "h-[52px] sticky top-[--height-header] tabletDevice:top-[calc(var(--height-header)+60px)] pc:top-[--height-header] -mx-[1px]  overflow-hidden",
          tab: "flex-1 w-auto",
        }}
        onTab={(label) => setMenu(label as MenuKey)}
        tabs={[
          {
            label: "Introduction",
            content: (
              <div className="flex w-full h-full justify-center items-center">
                <Button>README.md</Button>
                {isMyPage && (
                  <Icons.EditIntro
                    className="ml-[2px] text-[16px] mt-[6px] shrink-0 cursor-pointer"
                    onClick={handleIntroductionEditMode}
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
      <UserProfileSection className="bg-white border-none shadow-none p-0 -mx-0.5 sticky">
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
    <div
      className={
        "min-h-[calc(581px+(100dvh-732px))] tabletDevice:min-h-[calc(584px+(100dvh-792px))] pc:min-h-[calc(584px+(100dvh-732px))]"
      }
    >
      <div className="bg-white rounded-lg border border-colorsGray h-max p-4">
        {children}
      </div>
    </div>
  )
}
