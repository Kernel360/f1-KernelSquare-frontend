import queryKey from "@/constants/queryKey"
import { GetMemberRequest } from "@/interfaces/dto/member/get-member.dto"
import { UpdateMemberInfoRequest } from "@/interfaces/dto/member/update-member-info.dto"
import { getMemeber, updateMemberInfo } from "@/service/member"
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"

const useMemberData = ({ id }: GetMemberRequest) =>
  useQuery({
    queryKey: [queryKey.member],
    queryFn: () => getMemeber({ id }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    select(payload) {
      return payload.data.data
    },
  })

const useUpdateInfo = ({
  id,
  image_url,
  introduction,
}: UpdateMemberInfoRequest) =>
  useMutation({
    mutationKey: [queryKey.member, queryKey.updateInfo],
    mutationFn: () => updateMemberInfo({ id, image_url, introduction }),
  })

export const memberQueries = {
  useMemberData,
  useUpdateInfo,
}
