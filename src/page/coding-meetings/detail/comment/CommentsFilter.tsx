"use client"

import { Icons } from "@/components/icons/Icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Button } from "@/components/ui/button"
import {
  CodingMeetingCommentsFilter,
  CodingMeetingCommentsFilterOption,
  getCodingMeetingCommentsFilter,
  setCodingMeetingCommentsFilter,
} from "@/util/filter/coding-meeting-comments"
import { useState } from "react"

function CommentsFilter() {
  const [filter, setFilter] = useState(getCodingMeetingCommentsFilter())

  const onValueChange = (filter: string) => {
    setFilter(filter as CodingMeetingCommentsFilterOption)

    setCodingMeetingCommentsFilter(filter as CodingMeetingCommentsFilterOption)
    window.dispatchEvent(new StorageEvent("storage"))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} className="border-none gap-1">
          <Icons.Filter className="text-2xl" />
          {CodingMeetingCommentsFilter[filter]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>댓글 정렬</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={filter} onValueChange={onValueChange}>
          <DropdownMenuRadioItem
            value={"ascending" as CodingMeetingCommentsFilterOption}
          >
            {CodingMeetingCommentsFilter["ascending"]}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value={"descending" as CodingMeetingCommentsFilterOption}
          >
            {CodingMeetingCommentsFilter["descending"]}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CommentsFilter
