"use client"

import { useMemo } from "react"
import LoginForm from "@/components/form/LoginForm"
import Button from "@/components/shared/button/Button"
import useModal from "@/hooks/useModal"
import Link from "next/link"
import { Icons } from "@/components/icons/Icons"
import Skeleton from "react-loading-skeleton"
import Profile from "@/components/shared/Profile"
import Dropdown from "rc-dropdown"
import Menu, { Item as MenuItem, Divider } from "rc-menu"
import { useRecoilValue, useRecoilValueLoadable } from "recoil"
import { userAtom, userSelector } from "@/recoil/atoms/user"

type ProfileDropdownMenu = {
  label?: string
  to?: string
  onClick?: () => void | Promise<void>
  role: "menu" | "divider"
}

const profileDropdownMenu: Array<ProfileDropdownMenu> = [
  { label: "내 프로필", to: "/profile", role: "menu" },
  { role: "divider" },
  {
    label: "로그아웃",
    role: "menu",
    onClick() {
      console.log("logout")
    },
  },
]

function UserArea() {
  const user = useRecoilValue(userAtom)
  const userLoadable = useRecoilValueLoadable(userSelector)

  const menu = useMemo(() => {
    return (
      <Menu className="!p-4 !text-xs">
        {profileDropdownMenu.map((menu, index) => {
          if (menu.role === "divider") {
            return (
              <Divider
                key={`rc-divider-${index}`}
                className="h-[1px] bg-colorsGray !my-4"
              />
            )
          }

          return (
            <MenuItem
              key={`rc-menu-item-${menu}-${index}`}
              className="cursor-pointer hover:underline hover:underline-offset-2"
              onClick={menu.onClick}
            >
              {menu.to ? <Link href={menu.to}>{menu.label}</Link> : menu.label}
            </MenuItem>
          )
        })}
      </Menu>
    )
  }, [])

  if (userLoadable.state === "loading") {
    return <Skeleton width={128} height={28} />
  }

  if (userLoadable.state === "hasValue" && !user) {
    return <NotLoginedUserArea />
  }

  return userLoadable.state === "hasValue" ? (
    <div className="flex gap-2 items-center">
      <Dropdown trigger={["click"]} overlay={menu}>
        <Profile profileImage={user?.image_url} />
      </Dropdown>
      <Button className="p-0">
        <Icons.Notification className="text-2xl text-colorsGray" />
      </Button>
    </div>
  ) : null
}

function NotLoginedUserArea() {
  const { openModal } = useModal()

  return (
    <div className="flex gap-2 items-center">
      <Button
        className="border border-colorsGray font-normal"
        buttonTheme="primary"
        onClick={() => openModal({ content: <LoginForm /> })}
      >
        로그인
      </Button>
      <Link href={"/signup"}>
        <Button
          ghost
          buttonTheme="secondary"
          className="border border-colorsGray font-normal"
        >
          회원가입
        </Button>
      </Link>
    </div>
  )
}

export default UserArea
