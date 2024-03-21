import {
  GetMemberRequest,
  GetMemberResponse,
} from "@/interfaces/dto/member/get-member.dto"
import { apiInstance } from "./axios"
import { RouteMap } from "./route-map"
import { AxiosResponse } from "axios"
import {
  UpdateMemberIntroductionRequest,
  UpdateMemberIntroductionResponse,
} from "@/interfaces/dto/member/update-member-introduction.dto"
import {
  UpdateMemberProfileImageRequest,
  UpdateMemberProfileImageResponse,
} from "@/interfaces/dto/member/update-member-profile-image-dto"
import {
  UpdateMemberNicknameRequest,
  UpdateMemberNicknameResponse,
} from "@/interfaces/dto/member/update-member-nickname.dto"

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

/**
 * 유저 닉네임 수정 API (PUT)
 *
 * `member_id` : 유저 아이디 (number)
 *
 * `nickname` : 변경 닉네임 (string)
 *
 */
export async function updateMemberNickname({
  member_id,
  nickname,
}: UpdateMemberNicknameRequest) {
  const res = await apiInstance.put<
    any,
    AxiosResponse<UpdateMemberNicknameResponse>,
    UpdateMemberNicknameRequest
  >(RouteMap.member.updateMemberNickname, {
    member_id,
    nickname,
  })

  return res
}
