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
    nickname,
    introduction,
    image_url,
  })

  return res
}
