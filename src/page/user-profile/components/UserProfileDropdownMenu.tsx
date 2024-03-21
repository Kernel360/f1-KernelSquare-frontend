"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { GrDocumentConfig } from "react-icons/gr"

function UserProfileDropdownMenu() {
  const { push } = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="gap-1">
          <GrDocumentConfig className="text-base" />
          설정
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" sideOffset={4}>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => push("/profile/nickname")}
          >
            닉네임 수정
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserProfileDropdownMenu
