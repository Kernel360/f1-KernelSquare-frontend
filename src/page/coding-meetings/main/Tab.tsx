"use client"

import Button from "@/components/shared/button/Button"
import Tab from "@/components/shared/tab/Tab"
import { CodingMeetingListFilter } from "@/interfaces/dto/coding-meeting/get-coding-meetingl-list.dto"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

type TabLabel = CodingMeetingListFilter

function CodingMeetingTabs() {
  const { push } = useRouter()

  const searchParams = useSearchParams()

  const [label, setLabel] = useState<TabLabel>(
    (searchParams.get("filter")?.toLowerCase() as TabLabel) ?? "All",
  )
  const labelText = {
    all: "전체",
    open: "모집중",
    closed: "마감됨",
  } satisfies Record<TabLabel, string>
  const tabOrder: Array<TabLabel> = ["all", "open", "closed"]

  const targetLinkHref = (targetLabel: TabLabel) => {
    const searchParams = new URLSearchParams()

    switch (targetLabel) {
      case "all":
        searchParams.set("filter", "all")
        break
      case "open":
        searchParams.set("filter", "open")
        break
      case "closed":
        searchParams.set("filter", "closed")
        break
    }

    return `/coding-meetings?page=0&size=10&${searchParams.toString()}`
  }

  return (
    <Tab
      defaultTab={label}
      onTab={(tabLabel) => {
        setLabel(tabLabel as TabLabel)
        push(targetLinkHref(tabLabel as TabLabel))
      }}
      tabs={tabOrder.map((tabLabel) => ({
        label: tabLabel,
        content: (
          <Button className="text-base [font-weight:inherit]">
            {labelText[tabLabel]}
          </Button>
        ),
      }))}
      classNames={{
        wrapper: "my-6 justify-start",
        tab: "flex-1 text-center h-[inherit] box-border tablet:box-content tablet:w-fit tablet:flex-initial px-6 py-2 tablet:py-4 font-normal",
      }}
      activeClassNames={{
        tab: "text-primary tablet:text-secondary !font-bold",
        gutter: "bg-primary",
      }}
    />
  )
}

export default CodingMeetingTabs
