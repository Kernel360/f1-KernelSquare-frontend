"use client"

import { ApiStatus } from "@/constants/response/api"
import { getCoffeeChatReservationList } from "@/service/coffee-chat"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter, useSearchParams } from "next/navigation"
import CoffeeChatList from "./CoffeeChatList"
import Pagination from "@/components/shared/pagination/Pagination"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import ListPage from "@/components/shared/page-template/ListPage"
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
    return <ListPage.Loading section="coffeeChat" />
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

    return (
      <div className="mt-6">
        <CoffeeChatList coffeeChatList={coffeeChatList.list} />
        <div className="mt-4 sm:mt-[108px] pc:mt-[67px]">
          <Pagination
            disabledClassName="hidden"
            forcePage={Number(page)}
            pageCount={coffeeChatList!.pagination.total_page}
            onPageChange={({ selected }) => {
              push(`/chat?page=${selected}`)
            }}
            onSkip={({ type, pageCount }) => {
              const searchParams = new URLSearchParams()

              const pageNumber = Number(page)

              if (type === "prevSkip") {
                if (pageCount > 10 && pageNumber - 10 >= 0) {
                  searchParams.set("page", `${pageNumber - 10}`)

                  push(`/chat?${searchParams.toString()}`)

                  return
                }

                return
              }

              if (type === "nextSkip") {
                if (pageCount > 10 && pageCount - 1 - pageNumber >= 10) {
                  searchParams.set("page", `${pageNumber + 10}`)

                  push(`/chat?${searchParams.toString()}`)
                }

                return
              }
            }}
          />
        </div>
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
