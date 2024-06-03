"use client"

import { UserPayload } from "@/interfaces/dto/member/get-member.dto"
import { getMemeber } from "@/service/member"
import { useSuspenseQuery } from "@tanstack/react-query"
import UserProfilePresenter from "./UserProfilePresenter"
import { USER_QUERY_KEY } from "@/constants/queryKey"

interface UserProfileContainerProps {
  memberId: number
}

function UserProfileContainer({ memberId }: UserProfileContainerProps) {
  const { data: payload } = useSuspenseQuery({
    queryKey: USER_QUERY_KEY.getUser(memberId),
    queryFn: () => getMemeber({ id: memberId }),
    select(response) {
      return response.data.data as UserPayload
    },
  })

  return <UserProfilePresenter userPayload={payload} />
}

export default UserProfileContainer
