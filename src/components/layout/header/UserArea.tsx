"use client"

import { useMemo } from "react"
import LoginForm from "@/components/form/LoginForm"
import Button from "@/components/shared/button/Button"
import useModal from "@/hooks/useModal"
import Link from "next/link"
import { Icons } from "@/components/icons/Icons"
import { useUser } from "@/hooks/useUser"
import Skeleton from "react-loading-skeleton"
import Profile from "@/components/shared/Profile"
import Dropdown from "rc-dropdown"
import Menu, { Item as MenuItem, Divider } from "rc-menu"

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
  const { data: payload, isPending } = useUser()

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

  if (isPending) {
    return <Skeleton width={128} height={28} />
  }

  if (!payload) {
    return <NotLoginedUserArea />
  }

  return (
    <div className="flex gap-2 items-center">
      <Dropdown trigger={["click"]} overlay={menu}>
        <Profile profileImage={payload.data.data?.image_url} />
      </Dropdown>
      <Button className="p-0">
        <Icons.Notification className="text-2xl text-colorsGray" />
      </Button>
    </div>
  )
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
