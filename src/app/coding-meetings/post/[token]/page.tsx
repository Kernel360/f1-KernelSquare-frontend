import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getServerSession } from "@/util/auth"
import { AxiosError } from "axios"
import type { GetCodingMeetingDetailResponse } from "@/interfaces/dto/coding-meeting/get-coding-meeting-detail.dto"
import { ApiStatus } from "@/constants/response/api"
import { getCodingMeetingDetail } from "@/service/coding-meetings"
import AuthGuardModal from "@/components/shared/auth-modal"
import CreateCodingMeetingPage from "@/page/coding-meetings/create/CreateCodingMeetingPage"

export interface UpdateCodingMeetingsPageProps {
  params: {
    token: string
  }
}

export const metadata: Metadata = {
  title: "모각코 수정",
  description: "모여서 각자 코딩 모임 수정",
}

export default async function UpdateCodingMeetingsPage({
  params,
}: UpdateCodingMeetingsPageProps) {
  if (!params.token) notFound()

  const { user } = getServerSession()

  try {
    const { data: codingMeetingPayload } = await getCodingMeetingDetail({
      coding_meeting_token: params.token,
    })

    if (!user) {
      return (
        <AuthGuardModal
          page="updateCodingMeeting:Unauthorized"
          payload={{ coding_meeting_token: params.token }}
        />
      )
    }
    if (codingMeetingPayload!.data?.member_nickname !== user.nickname) {
      return (
        <AuthGuardModal
          page="updateCodingMeeting:Forbidden"
          payload={{ coding_meeting_token: params.token }}
        />
      )
    }
    return (
      <div>
        <CreateCodingMeetingPage
          editMode="update"
          coding_meeting_token={params.token}
          initialValues={codingMeetingPayload.data}
        />
      </div>
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<GetCodingMeetingDetailResponse>

      if (response) {
        const { code } = response.data

        if (
          code === ApiStatus.CodingMeetings.getCodingMeetingDetail.NotFound.Code
        ) {
          return <>존재하지 않는 모각코</>
        }
      }
    }
    notFound()
  }
}
