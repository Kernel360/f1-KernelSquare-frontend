"use client"

import Tab from "@/components/shared/tab/Tab"
import { UserPayload } from "@/interfaces/dto/member/get-member.dto"
import { useState } from "react"
import UserProfileSection from "./UserProfileSection"
import Button from "@/components/shared/button/Button"
import Spacing from "@/components/shared/Spacing"

interface UserProfileMenuProps {
  userPayload: UserPayload
}

type MenuKey = "Introduction"

function UserProfileMenu({ userPayload }: UserProfileMenuProps) {
  const [menu, setMenu] = useState<MenuKey>("Introduction")

  const MenuContent = () => {
    switch (menu) {
      case "Introduction":
        return <Introduction introduction={userPayload.introduction} />
      default:
        return null
    }
  }

  return (
    <>
      <Tab
        classNames={{
          wrapper:
            "h-[52px] sticky top-[calc(var(--height-header)+66px)] sm:top-[calc(var(--height-header))] -mx-[1px]",
          tab: "flex-1 w-auto",
        }}
        onTab={(label) => setMenu(label as MenuKey)}
        tabs={[
          {
            label: "Introduction",
            content: <Button className="w-full h-full">README.md</Button>,
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

function Introduction({ introduction }: Pick<UserPayload, "introduction">) {
  if (!introduction) {
    return (
      <UserProfileMenu.MenuContentWrapper>
        <span className="font-bold text-colorsGray text-center block">
          작성된 자기소개가 없습니다
        </span>
      </UserProfileMenu.MenuContentWrapper>
    )
  }

  return (
    <UserProfileMenu.MenuContentWrapper>
      <p className="whitespace-pre-wrap">{introduction}</p>
    </UserProfileMenu.MenuContentWrapper>
  )
}
