"use client"

import { ACCESS_TOKEN_KEY } from "@/constants/token"
import { getMemeber } from "@/service/member"
import { getCookie } from "cookies-next"
import { jwtDecode } from "@/util/actions/jwt"
import { useQuery } from "@tanstack/react-query"

/*
  백엔드 협의되어 토큰만 가지고
  유저 정보를 얻을 수 있는
  api가 추가될 경우 수정 예정
*/

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = getCookie(ACCESS_TOKEN_KEY)

      if (!token) return null

      const { id } = await jwtDecode(token)

      return await getMemeber({ id })
    },
    staleTime: 1000 * 5,
    gcTime: 0,
  })
}
