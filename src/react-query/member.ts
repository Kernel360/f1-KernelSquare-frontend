import queryKey from "@/constants/queryKey"
import { GetMemberRequest } from "@/interfaces/dto/member/get-member.dto"
import { getMemeber } from "@/service/member"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

const useMemberData = ({ id }: GetMemberRequest) =>
  useQuery({
    queryKey: [queryKey.member],
    queryFn: () => getMemeber({ id }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 5,
    select(payload) {
      return payload.data.data
    },
  })

export const memberQueries = {
  useMemberData,
}
