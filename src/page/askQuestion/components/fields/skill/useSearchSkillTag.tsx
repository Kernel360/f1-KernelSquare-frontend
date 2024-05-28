"use client"

import { searchTags } from "@/service/techs"
import { useQuery } from "@tanstack/react-query"
import { useLayoutEffect, useState } from "react"

interface UseSearchSkillTag {
  keyword: string
}

export function useSearchSkillTag({ keyword }: UseSearchSkillTag) {
  const [page, setPage] = useState(0)

  const { data, status, error } = useQuery({
    queryKey: ["techs", "search", keyword, page],
    queryFn: () => {
      return searchTags({ keyword, page })
    },
    select(response) {
      return response.data.data
    },
  })

  const nextPage = () => {
    if (data?.pagination.is_end || !data?.pagination.total_page) return
    setPage((prev) => prev + 1)
  }

  const prevPage = () => {
    if (page === 0) return
    setPage((prev) => prev - 1)
  }

  useLayoutEffect(() => {
    setPage((prev) => 0)
  }, [keyword])

  return {
    skills: data?.tech_stack_list ?? [],
    status,
    error,
    nextPage,
    prevPage,
    pagination: {
      page,
      totalPage: data?.pagination.total_page,
    },
  }
}
