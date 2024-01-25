"use client"

import { createPortal } from "react-dom"
import { ApiStatus } from "@/constants/response/api"
import { getCoffeeChatReservationList } from "@/service/coffee-chat"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import CoffeeChatList from "./CoffeeChatList"
import Pagination from "@/components/shared/pagination/Pagination"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import CoffeeChatPageLoading from "@/app/chat/_components/Loading"
import type { APIResponse } from "@/interfaces/dto/api-response"

function CoffeeChatListContainer() {
  const searchParams = useSearchParams()
  const page = searchParams.get("page") ?? 0

  const { push } = useRouter()

  const {
    data: coffeeChatList,
    isPending,
    error,
  } = useQuery({
    queryKey: ["chat", "list", page],
    queryFn: () => getCoffeeChatReservationList({ page: Number(page) }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    select(response) {
      return response.data.data
    },
  })

  if (isPending) {
    return <CoffeeChatPageLoading page="main" />
  }

  const Content = () => {
    if (error) {
      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>

        if (
          response?.status ===
          ApiStatus.CoffeeChat.getAllCoffeeChatPosts.NotFound.HttpStatus
        ) {
          return <CoffeeChatList.NotHasCoffeeChatList type={"noPage"} />
        }
      }
    }

    if (
      !coffeeChatList ||
      !coffeeChatList.pagination.total_page ||
      !coffeeChatList.pagination.pageable
    ) {
      return <CoffeeChatList.NotHasCoffeeChatList type={"noContent"} />
    }

    const Portal = createPortal(
      <Pagination
        previousLabel="이전"
        nextLabel="다음"
        disabledClassName="hidden"
        forcePage={Number(page)}
        pageCount={coffeeChatList!.pagination.total_page}
        onPageChange={({ selected }) => {
          push(`/chat?page=${selected}`)
        }}
      />,
      document.getElementById("chat-pagination")!,
    )

    return (
      <div className="mt-1 py-4 w-[calc(100%-14px)] sm:w-[calc(100%-24px)] lg:w-[calc(100%-44px)] mx-auto">
        <CoffeeChatList coffeeChatList={coffeeChatList.list} />
        {Portal}
      </div>
    )
  }

  return (
    <>
      <Content />
    </>
  )
}

export default CoffeeChatListContainer

const cupMoving = keyframes`
  from {
    transform: rotateY(0deg);
    left: 0px;
  }

  50% {
    transform: rotateY(0deg);
    left: calc(100% - 120px);
  }
  51% {
    transform: rotateY(180deg);
  }

  99% {
    transform: rotateY(180deg);
    left: 0px;
  }

  to {
    transform: rotate(0deg);
    left: 0px
  }
`

const Cup = styled.div`
  animation: ${cupMoving} 10s linear infinite forwards;
`
