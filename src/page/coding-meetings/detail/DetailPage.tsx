import { CodingMeetingDetailPayload } from "@/interfaces/dto/coding-meeting/get-coding-meeting-detail.dto"
import UserInfo from "./UserInfo"
import { CodingMeetingAuthor } from "@/interfaces/coding-meetings"
import DetailMenu from "./DetailMenu"
import Spacing from "@/components/shared/Spacing"
import DetailSection from "./Section"
import Link from "next/link"
import HashTag from "@/components/shared/tag/HashTag"
import DetailComments from "./comment/Comments"
import dynamic from "next/dynamic"
import MapContainer from "./kakao-map/MapContainer"
import { Icons } from "@/components/icons/Icons"
import CodingMeetingClose from "./modal/CodingMeetingClose"

interface CodingMeetingsDetailPageProps {
  detail: CodingMeetingDetailPayload
}

const DetailMap = dynamic(
  () => import("@/page/coding-meetings/detail/kakao-map/Map"),
  {
    ssr: false,
    loading(loadingProps) {
      return (
        <div className="absolute left-0 top-0 z-[2] w-full h-full flex flex-col justify-center items-center bg-white">
          <div className="w-8 h-8 flex justify-center items-center rounded-full border border-[#828282]">
            <Icons.MapMarker className="text-[#828282]" />
          </div>
          <div className="mt-5 text-sm text-[#828282]">카카오 맵 로드 중</div>
        </div>
      )
    },
  },
)

const DetailCodingMeetingTime = dynamic(
  () => import("@/page/coding-meetings/detail/DetailTime"),
  {
    ssr: false,
    loading(loadingProps) {
      return (
        <div className="flex items-center h-5 text-sm text-[#828282]">
          한국 시간(KST)으로 변환 중
        </div>
      )
    },
  },
)

const CodingMeetingsDetailPage = ({
  detail,
}: CodingMeetingsDetailPageProps) => {
  const author: CodingMeetingAuthor = {
    member_id: detail.member_id,
    member_nickname: detail.member_nickname,
    member_profile_url: detail.member_profile_url,
    member_level_image_url: detail.member_level_image_url,
    member_level: detail.member_level,
  }

  return (
    <>
      <div className="mb-12 py-6">
        <section className="mt-6 w-full flex justify-between items-center">
          <h3 className="font-semibold text-xl lg:text-2xl">
            {detail.coding_meeting_title}
          </h3>
          <DetailMenu token={detail.coding_meeting_token} author={author} />
        </section>
        <section className="w-full flex justify-between items-center mt-6 mb-4">
          <UserInfo user={author} />
          <CodingMeetingClose
            meetingToken={detail.coding_meeting_token}
            closed={detail.coding_meeting_closed}
            author={author}
          />
        </section>
        <hr className="bg-[#E8E8E8] mb-6" />
        <div>
          <span className="font-semibold">모집정보</span>
          <Spacing size={24} />
          <div className="flex flex-col tablet:flex-row tablet:justify-between tablet:gap-4">
            <div className="flex flex-col gap-4 max-w-full tablet:w-[40%]">
              <DetailSection title="일시">
                <DetailCodingMeetingTime
                  startTime={detail.coding_meeting_start_time}
                  endTime={detail.coding_meeting_end_time}
                />
              </DetailSection>
              <DetailSection title="인원">
                <span className="font-medium">
                  {detail.coding_meeting_member_upper_limit}인
                </span>
              </DetailSection>
              <DetailSection title="위치">
                <Link
                  target="_blank"
                  href={`https://place.map.kakao.com/${detail.coding_meeting_location_id}`}
                  className="font-medium underline underline-offset-4"
                >
                  {detail.coding_meeting_location_place_name}
                </Link>
              </DetailSection>
            </div>
            <div className="relative border border-colorsGray rounded-lg overflow-hidden mt-6 tablet:mt-0 w-full aspect-[1.114/1] tablet:w-auto tablet:aspect-[1.116/1] tablet:h-[323px] lg:!h-[431px]">
              <MapContainer>
                <DetailMap
                  x={detail.coding_meeting_location_latitude}
                  y={detail.coding_meeting_location_longitude}
                  placeName={detail.coding_meeting_location_place_name}
                />
              </MapContainer>
            </div>
          </div>
          <DetailSection className="mt-8 tablet:mt-6" title="소개글">
            <span className="font-medium whitespace-pre-line">
              {detail.coding_meeting_content}
            </span>
          </DetailSection>
          {detail.coding_meeting_hashtags.length ? (
            <ul className="mt-10 tablet:mt-[50px] flex w-full gap-2">
              {detail.coding_meeting_hashtags.map((hashTag) => (
                <li key={hashTag}>
                  <HashTag>{hashTag}</HashTag>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <DetailComments author={author} token={detail.coding_meeting_token} />
    </>
  )
}

export default CodingMeetingsDetailPage
