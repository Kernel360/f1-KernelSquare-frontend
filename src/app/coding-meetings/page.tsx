import { CodingMeetingListFilter } from "@/interfaces/dto/coding-meeting/get-coding-meetingl-list.dto"
import CodingMeetingsMain from "@/page/coding-meetings/main/MainPage"
import { Metadata } from "next"
import { notFound, redirect } from "next/navigation"

interface CodingMeetingsMainPageProps {
  searchParams: {
    page?: string
    size?: string
    filter?: CodingMeetingListFilter
  }
}

function isValidProps({ searchParams }: CodingMeetingsMainPageProps) {
  const { page, size, filter } = searchParams

  if (page) {
    const pageNumber = Number(page)
    if (Number.isNaN(pageNumber) || pageNumber < 0 || page.includes(".")) {
      return false
    }
  }

  if (size) {
    const sizeNumber = Number(size)
    if (Number.isNaN(size) || sizeNumber < 0 || size.includes(".")) {
      return false
    }
  }

  if (filter) {
    const validFilter: Array<CodingMeetingListFilter> = [
      "all",
      "open",
      "closed",
    ]
    if (!validFilter.includes(filter)) {
      return false
    }
  }

  return true
}

export const metadata: Metadata = {
  title: "모각코",
  description: "모여서 각자 코딩",
}

export default function CodingMeetingsMainPage({
  searchParams,
}: CodingMeetingsMainPageProps) {
  if (!isValidProps({ searchParams })) {
    notFound()
  }

  const { page, size, filter } = searchParams

  if (!filter || !page || !size) {
    const search = new URLSearchParams()
    search.set("page", page ?? "0")
    search.set("size", size ?? "10")
    search.set("filter", filter ?? ("all" as CodingMeetingListFilter))

    redirect(`/coding-meetings?${search.toString()}`)
  }

  return <CodingMeetingsMain />
}
