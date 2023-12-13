"use client"

import LoginForm from "@/components/form/LoginForm"
import { Icons } from "@/components/icons/Icons"
import Inner from "@/components/shared/Inner"
import Button from "@/components/shared/button/Button"
import RowInput from "@/components/shared/input/RowInput"
import { layoutMeta } from "@/constants/layoutMeta"
import useModal from "@/hooks/useModal"
import { matchLayoutMetaKey } from "@/util/layoutMeta"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef } from "react"

function Header() {
  const currentPath = usePathname()

  const pathKey = matchLayoutMetaKey(currentPath)

  const open = layoutMeta[pathKey]
    ? layoutMeta[pathKey].containLayout.header
    : true

  return open ? (
    <header className="bg-white h-16 p-2 sticky top-0 shadow-[0_2px_4px_0_hsla(0,0%,80.8%,.5)] z-header">
      <Inner className="flex justify-between items-center h-full">
        {/* logo - click: move Home */}
        <Link href={"/"}>KernalSquare</Link>
        {/* search */}
        <SearchField />
        {/* userArea */}
        <UserArea />
      </Inner>
    </header>
  ) : null
}

// [TODO] search

function SearchField() {
  const { openModal } = useModal()

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <RowInput
        ref={inputRef}
        spellCheck="false"
        sideField={
          <Button
            onClick={() =>
              console.log("search", { keyword: inputRef.current?.value })
            }
          >
            <Icons.Search />
          </Button>
        }
        classNames={{
          container: "hidden sm:inline-flex sm:w-[380px]",
          wrapper:
            "bg-colorsLightGray border-transparent hover:border-colorsGray focus-within:outline focus-within:outline-offset-[3px] focus-within:outline-emerald-200/30",
          input: "bg-transparent",
        }}
      />
      <div className="inline-flex flex-1 justify-end sm:hidden">
        <Button
          onClick={() =>
            openModal({
              containsHeader: false,
              content: <SearchModal />,
              classNames: "self-start mt-[72px]",
            })
          }
        >
          <Icons.Search className="text-xl" />
        </Button>
      </div>
    </>
  )
}

function SearchModal() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <RowInput
      ref={inputRef}
      spellCheck="false"
      sideField={
        <Button
          onClick={() =>
            console.log("search:modal", { keyword: inputRef.current?.value })
          }
        >
          <Icons.Search />
        </Button>
      }
      classNames={{
        wrapper:
          "bg-colorsLightGray border-transparent hover:border-primary focus-within:outline focus-within:outline-offset-[3px] focus-within:outline-emerald-200/30",
        input: "bg-transparent",
      }}
    />
  )
}

function UserArea() {
  const { openModal } = useModal()

  return (
    <div className="flex gap-2 items-center">
      {/* <Link href="/">
        <Icons.UserProfile className="text-2xl fill-colorsGray" />
      </Link>
      <Button className="p-0">
        <Icons.Notification className="text-2xl text-colorsGray" />
      </Button> */}
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

export default Header
