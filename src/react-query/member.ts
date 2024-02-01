import queryKey from "@/constants/queryKey"
import type { GetMemberRequest } from "@/interfaces/dto/member/get-member.dto"
import type { UpdateMemberIntroductionRequest } from "@/interfaces/dto/member/update-member-introduction.dto"
import type { UpdateMemberProfileImageRequest } from "@/interfaces/dto/member/update-member-profile-image-dto"
import {
  getMemeber,
  updateMemberIntroduction,
  updateMemberProfileImage,
} from "@/service/member"
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query"

/**
 *
 * @param param0 id: 사용자 id
 * @returns payload.data.data
 */
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

/**
 *
 * @description 사용자 자기소개 수정
 * @param UpdateMemberIntroductionRequest
 */
const useUpdateMemberIntroduction = () => {
  const {
    mutate: updateMemberIntroductionMutate,
    isPending: isUpdateMemberIntroduction,
    isError: isUpdateMemberIntroductionError,
    isSuccess: isUpdateMemberIntroductionSuccess,
  } = useMutation({
    mutationKey: [queryKey.member, queryKey.updateInfo],
    mutationFn: ({ memberId, introduction }: UpdateMemberIntroductionRequest) =>
      updateMemberIntroduction({ memberId, introduction }),
  })

  return {
    updateMemberIntroduction: updateMemberIntroductionMutate,
    updateMemberIntroductionStatus: {
      isUpdateMemberIntroduction,
      isUpdateMemberIntroductionError,
      isUpdateMemberIntroductionSuccess,
    },
  }
}

/**
 *
 * @description 사용자 프로필 이미지 수정
 * @param UpdateMemberProfileImageRequest
 */
const useUpdateMemberProfileImage = () => {
  const {
    mutate: updateMemberProfileImageMutate,
    isPending: isUpdateMemberProfileImage,
    isError: isUpdateMemberProfileImageError,
    isSuccess: isUpdateMemberProfileImageSuccess,
  } = useMutation({
    mutationKey: [queryKey.member, queryKey.updateInfo],
    mutationFn: ({ memberId, image_url }: UpdateMemberProfileImageRequest) =>
      updateMemberProfileImage({ memberId, image_url }),
  })

  return {
    updateMemberProfileImage: updateMemberProfileImageMutate,
    updateMemberProfileImageStatus: {
      isUpdateMemberProfileImage,
      isUpdateMemberProfileImageError,
      isUpdateMemberProfileImageSuccess,
    },
  }
}

export const memberQueries = {
  useMemberData,
  useUpdateMemberIntroduction,
  useUpdateMemberProfileImage,
}
