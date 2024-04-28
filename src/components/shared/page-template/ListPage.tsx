"use client"

import CodingMeetingInfoArea from "@/page/coding-meetings/main/info-area/CodingMeetingInfoArea"
import ListLoading from "../animation/ListLoading"
import CodingMeetingTabs from "@/page/coding-meetings/main/Tab"
import { Icons } from "@/components/icons/Icons"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/PopOver"
import { PopoverClose } from "@radix-ui/react-popover"
import QnAInfoArea from "@/page/coding-meetings/main/info-area/QnAInfoArea"
import CoffeeChatInfoArea from "@/page/coding-meetings/main/info-area/CoffeeChatInfoArea"
import { twMerge } from "tailwind-merge"

interface ListPageProps {
  section: "qna" | "codingMeetings" | "coffeeChat" | "notification"
  children: React.ReactNode
}

function ListPage({ section, children }: ListPageProps) {
  const classNames = twMerge([
    "flex w-full px-6 pt-6 pb-6 tabletDevice:pt-8 pc:mt-[72px] box-border",
    section === "coffeeChat" &&
      "pb-6 tabletDevice:pt-6 tabletDevice:pb-12 pc:pb-[72px] pc:mt-0 pc:pt-[75px]",
  ])

  const sideClassNames = twMerge([
    "bg-transparent min-h-screen hidden lg:block lg:w-44 xl:w-72",
    section === "coffeeChat" && "!hidden",
  ])

  return (
    <div className={classNames}>
      <div className="flex-1 max-w-full">
        <Title section={section} />
        <ListPage.InfoArea section={section} />
        <ListPage.Tabs section={section} />
        {children}
      </div>
      <aside className={sideClassNames} />
    </div>
  )
}

export default ListPage

function Title({ section }: { section: ListPageProps["section"] }) {
  const title = {
    qna: <h3>개발자 Q&A</h3>,
    codingMeetings: (
      <section className="w-full flex shrink-0 items-center gap-1">
        <h4 className="mb-1">모각코</h4>
        <Popover>
          <PopoverTrigger>
            <Icons.Info className="text-base" />
          </PopoverTrigger>
          <PopoverContent
            hideWhenDetached={true}
            side="right"
            align="start"
            sticky="always"
            alignOffset={4}
            className="min-w-[84px] max-w-[calc(100vw-160px)] sm:max-w-none sm:w-[260px] tablet:w-[340px] lg:!w-[400px] border border-[#828282] bg-white rounded-lg text-base p-4"
          >
            <section className="relative">
              <PopoverClose className="absolute -top-2 -right-2">
                <Icons.Close className="text-sm" />
              </PopoverClose>
              <h4 className="font-bold text-xs">모각코?</h4>
              <article className="text-sm">
                모각코는 <span className="text-primary">모여서 각자 코딩</span>
                의 줄임말로,
                <br />
                여러 사람이 같은 공간에 모여
                <br />
                각자의 코딩 공부나 프로젝트를 진행하는 활동입니다.
              </article>
            </section>
          </PopoverContent>
        </Popover>
      </section>
    ),
    coffeeChat: null,
    notification: <h3>알림</h3>,
  } satisfies Record<typeof section, React.ReactNode>

  if (title[section] === null) return null

  return (
    <section className="text-[#333333] text-[32px] font-semibold mb-6 tabletDevice:mb-8 pc:mb-12">
      {title[section]}
    </section>
  )
}

ListPage.InfoArea = function InfoArea({
  section,
}: {
  section: ListPageProps["section"]
}) {
  const Info = () => {
    switch (section) {
      case "qna":
        return <QnAInfoArea />
      case "codingMeetings":
        return <CodingMeetingInfoArea />
      case "coffeeChat":
        return <CoffeeChatInfoArea />
    }
  }

  return <Info />
}

ListPage.Tabs = function ListPageTab({
  section,
}: {
  section: ListPageProps["section"]
}) {
  const Tab = () => {
    switch (section) {
      case "qna":
        return null
      case "codingMeetings":
        return <CodingMeetingTabs />
      default:
        return null
    }
  }

  if (Tab === null) return null

  return (
    <div>
      <Tab />
    </div>
  )
}

ListPage.Loading = function ListPageDataLoading({
  section,
}: {
  section: ListPageProps["section"]
}) {
  const title = {
    qna: "Q&A 리스트",
    codingMeetings: "모각코 리스트",
    coffeeChat: "커피챗 리스트",
    notification: "알림 리스트",
  } satisfies Record<typeof section, React.ReactNode>

  return (
    <div className="relative">
      <h3 className="absolute w-full top-6 flex justify-center items-center">
        <span className="inline-flex align-top justify-center items-center w-max break-all text-sm box-border px-2 py-0.5 rounded-lg border border-colorsGray bg-colorsLightGray">
          {title[section]}
        </span>
        &nbsp;를 로딩하고 있어요
      </h3>
      <div className="h-full">
        <ListLoading
          style={{
            width: "calc(100% - 80px)",
            maxWidth: "300px",
            margin: "0 auto",
            opacity: "0.5",
          }}
        />
      </div>
    </div>
  )
}
