import {
  GetMemberRequest,
  GetMemberResponse,
} from "@/interfaces/dto/member/get-member.dto"
import { apiInstance } from "./axios"
import { RouteMap } from "./route-map"
import {
  UpdateMemberInfoRequest,
  UpdateMemberInfoResponse,
} from "@/interfaces/dto/member/update-member-info.dto"
import { AxiosResponse } from "axios"
import {
  UpdateMemberIntroductionRequest,
  UpdateMemberIntroductionResponse,
} from "@/interfaces/dto/member/update-member-introduction.dto"
import {
  UpdateMemberProfileImageRequest,
  UpdateMemberProfileImageResponse,
} from "@/interfaces/dto/member/update-member-profile-image-dto"

/**
 *
 * @param param0 id: 사용자 id
 * @returns res: 사용자 정보 조회 결과과
 */
export async function getMemeber({ id }: GetMemberRequest) {
  const res = await apiInstance.get<GetMemberResponse>(
    RouteMap.member.getMember(id),
  )

  return res
}

export async function updateMemberInfo({
  id,
  nickname,
  introduction,
  image_url,
}: UpdateMemberInfoRequest) {
  const res = await apiInstance.put<
    any,
    AxiosResponse<UpdateMemberInfoResponse>,
    Omit<UpdateMemberInfoRequest, "id">
  >(RouteMap.member.updateMemberInfo(id), {
    ...(nickname && { nickname }),
    introduction,
    image_url,
  })

  return res
}

/**
 *
 * @param param0 memberId: 사용자 id (number)
 * @param param1 introduction: 수정된 자기소개 내용 (string)
 * @returns res: 사용자 자기소개 수정 결과
 */
export async function updateMemberIntroduction({
  memberId,
  introduction,
}: UpdateMemberIntroductionRequest) {
  const res = await apiInstance.put<
    any,
    AxiosResponse<UpdateMemberIntroductionResponse>,
    Omit<UpdateMemberIntroductionRequest, "memberId">
  >(RouteMap.member.updateMemberIntroduction(memberId), {
    introduction,
  })

  return res
}

/**
 *
 * @param param0 memberId: 사용자 id (number)
 * @param param1 introduction: 수정된 프로필 이미지 URL (string | null)
 * @returns res: 사용자 프로필 이미지 수정 결과
 */
export async function updateMemberProfileImage({
  memberId,
  image_url,
}: UpdateMemberProfileImageRequest) {
  const res = await apiInstance.put<
    any,
    AxiosResponse<UpdateMemberProfileImageResponse>,
    Omit<UpdateMemberProfileImageRequest, "memberId">
  >(RouteMap.member.updateMemberProfileImage(memberId), {
    image_url,
  })

  return res
}
