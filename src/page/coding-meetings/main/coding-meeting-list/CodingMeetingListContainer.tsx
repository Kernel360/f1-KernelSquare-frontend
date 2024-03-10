"use client"

import { getCodingMeetingList } from "@/service/coding-meetings"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import CodingMeetingList from "./CodingMeetingList"
import { AxiosError } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import ListPage from "@/components/shared/page-template/ListPage"
import { CodingMeetingListFilter } from "@/interfaces/dto/coding-meeting/get-coding-meetingl-list.dto"
import Pagination from "@/components/shared/pagination/Pagination"

function CodingMeetingListContainer() {
  const { push } = useRouter()

  const searchParams = useSearchParams()

  const page = searchParams.get("page") ?? "0"
  const size = searchParams.get("size") ?? "10"
  const filter = (searchParams.get("filter") ??
    "all") as CodingMeetingListFilter

  const {
    data: codingMeetings,
    isPending,
    error,
  } = useQuery({
    queryKey: ["codingMeeting", "list", page, filter],
    queryFn: () =>
      getCodingMeetingList({ page: Number(page), size: 10, filter }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    select(payload) {
      return payload.data.data
    },
  })

  if (isPending) {
    return <ListPage.Loading section={"codingMeetings"} />
  }

  if (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIResponse>
      //
    }

    return <div>에러</div>
  }

  if (!codingMeetings?.list.length) {
    return <CodingMeetingList.NotHasQnAContent type="noContent" />
  }

  return (
    <>
      <CodingMeetingList codingMeetings={codingMeetings.list} />
      <div className="mt-12 tablet:mt-[78px] lg:!mt-8">
        <Pagination
          disabledClassName="hidden"
          forcePage={Number(page)}
          pageCount={codingMeetings.pagination.total_page}
          onPageChange={({ selected }) => {
            const searchParams = new URLSearchParams()
            searchParams.set("page", `${selected}`)
            searchParams.set("size", size)
            searchParams.set("filter", filter)

            push(`/coding-meetings?${searchParams.toString()}`)
          }}
          onSkip={({ type, pageCount }) => {
            const searchParams = new URLSearchParams()

            const pageNumber = Number(page)

            if (type === "prevSkip") {
              if (pageCount > 10 && pageNumber - 10 >= 0) {
                searchParams.set("page", `${pageNumber - 10}`)
                searchParams.set("size", size)
                searchParams.set("filter", filter)

                push(`/coding-meetings?${searchParams.toString()}`)

                return
              }

              return
            }

            if (type === "nextSkip") {
              if (pageCount > 10 && pageCount - 1 - pageNumber >= 10) {
                searchParams.set("page", `${pageNumber + 10}`)
                searchParams.set("size", size)
                searchParams.set("filter", filter)

                push(`/coding-meetings?${searchParams.toString()}`)

                return
              }

              return
            }
          }}
        />
      </div>
    </>
  )
}

export default CodingMeetingListContainer
