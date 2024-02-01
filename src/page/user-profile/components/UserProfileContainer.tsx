"use client"

import { UserPayload } from "@/interfaces/dto/member/get-member.dto"
import { getMemeber } from "@/service/member"
import { useSuspenseQuery } from "@tanstack/react-query"
import UserProfilePresenter from "./UserProfilePresenter"
import queryKey from "@/constants/queryKey"

interface UserProfileContainerProps {
  memberId: number
}

function UserProfileContainer({ memberId }: UserProfileContainerProps) {
  const { data: payload } = useSuspenseQuery({
    queryKey: [queryKey.user, queryKey.profile, memberId],
    queryFn: () => getMemeber({ id: memberId }),
    select(response) {
      return response.data.data as UserPayload
    },
  })

  return <UserProfilePresenter userPayload={payload} />
}

export default UserProfileContainer
