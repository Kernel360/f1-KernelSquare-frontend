"use client"

import CodingMeetingInfoArea from "@/page/coding-meetings/main/info-area/InfoArea"
import ListLoading from "../animation/ListLoading"
import CodingMeetingTabs from "@/page/coding-meetings/main/Tab"

interface ListPageProps {
  section: "qna" | "codingMeetings"
  children: React.ReactNode
}

function ListPage({ section, children }: ListPageProps) {
  return (
    <div className="flex w-full px-6 pt-6 pb-6 tablet:pt-8 lg:mt-[72px] box-border">
      <div className="flex-1 max-w-full">
        <Title section={section} />
        <ListPage.InfoArea section={section} />
        <ListPage.Tabs section={section} />
        {children}
      </div>
      <aside className="bg-transparent min-h-screen hidden tablet:block tablet:w-32 lg:w-72" />
    </div>
  )
}

export default ListPage

function Title({ section }: { section: ListPageProps["section"] }) {
  const title = {
    qna: "개발자 Q&A",
    codingMeetings: "모각코",
  } satisfies Record<typeof section, React.ReactNode>

  return (
    <h3 className="text-[#333333] text-[32px] font-semibold mb-6 tablet:mb-8 lg:mb-12">
      {title[section]}
    </h3>
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
      case "codingMeetings":
        return <CodingMeetingInfoArea />
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
