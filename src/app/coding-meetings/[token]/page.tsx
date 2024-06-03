import { Metadata } from "next"
import CodingMeetingsDetail from "@/page/coding-meetings/detail/DetailPage"
import { AxiosError } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import { notFound } from "next/navigation"
import { getCodingMeetingDetail } from "@/service/coding-meetings"
import ScrollTopButton from "@/components/shared/button/ScrollTopButton"
import { deSerializeCmToken } from "@/page/coding-meetings/util/cm-token"
import LinkToListPage from "@/components/LinkToListPage"

export interface CodingMeetingsDetailPageProps {
  params: {
    token: string
  }
}

export async function generateMetadata({
  params,
}: CodingMeetingsDetailPageProps): Promise<Metadata> {
  const fallbackMetadata: Metadata = {
    title: "모각코 상세보기",
    description: "모여서 각자 코딩 상세보기",
    openGraph: {
      title: "모각코 상세보기",
      description: "모여서 각자 코딩 상세보기",
      url: `/coding-meetings/${params.token}`,
      images: {
        url: "/og.png",
        alt: "Kernel Square",
      },
    },
    twitter: {
      title: "모각코 상세보기",
      description: "모여서 각자 코딩 상세보기",
      images: {
        url: "/og.png",
        alt: "Kernel Square",
      },
    },
  }

  try {
    const detailResponse = await getCodingMeetingDetail({
      coding_meeting_token: deSerializeCmToken(params.token),
    })

    const payload = detailResponse.data.data

    if (!payload) return fallbackMetadata

    return {
      title: `${payload.coding_meeting_title}`,
      description: `${payload.coding_meeting_content}`,
      openGraph: {
        title: `${payload.coding_meeting_title}`,
        description: `${payload.coding_meeting_content}`,
        url: `/coding-meetings/${params.token}`,
        images: {
          url: "/og.png",
          alt: "Kernel Square",
        },
      },
      twitter: {
        title: `${payload.coding_meeting_title}`,
        description: `${payload.coding_meeting_content}`,
        images: {
          url: "/og.png",
          alt: "Kernel Square",
        },
      },
    }
  } catch (error) {
    return fallbackMetadata
  }
}

export default async function CodingMeetingsDetailPage({
  params,
}: CodingMeetingsDetailPageProps) {
  try {
    const detailResponse = await getCodingMeetingDetail({
      coding_meeting_token: deSerializeCmToken(params.token),
    })

    return (
      <div className="flex w-full px-6 pt-5 pb-8 tablet:px-12 tablet:pb-12 lg:mt-[72px] box-border">
        <div className="flex-1 max-w-full break-all">
          <div className="hidden pc:block">
            <LinkToListPage to="coding-meetings" />
          </div>
          <CodingMeetingsDetail detail={detailResponse.data.data!} />
        </div>
        <aside className="bg-transparent min-h-screen hidden lg:block lg:w-32" />
        <ScrollTopButton />
      </div>
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error as AxiosError<APIResponse>

      return <div>{response?.data.msg ?? "에러"}</div>
    }

    notFound()
  }
}
