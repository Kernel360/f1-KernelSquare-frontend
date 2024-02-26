"use client"

import { errorMessage } from "@/constants/message"
import { useClientSession } from "@/hooks/useClientSession"
import { CodingMeetingHashTagList } from "@/recoil/atoms/coding-meeting/hashtags"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { FieldErrors, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useRecoilState } from "recoil"
import CodingMeetingSection from "./components/CodingMeetingSection"
import { Input } from "@/components/shared/input/Input"
import Spacing from "@/components/shared/Spacing"
import Textarea from "@/components/shared/textarea/Textarea"
import Button from "@/components/shared/button/Button"
import HashTagsSection from "./components/HashTagsSection"
import LocationSection from "./components/LocationSection"
import HeadCountSection from "./components/HeadCountSection"
import DateTimeSection from "./components/DateTimeSection"
import { CodingMeetingQueries } from "@/react-query/coding-meeting"
import { CodingMeetingHeadCount } from "@/recoil/atoms/coding-meeting/headcount"

interface CodingMeetingFormData {
  title: string
  content: string
}

const CreateCodingMeetingPage = () => {
  const [hash_tags, setHash_tags] = useRecoilState(CodingMeetingHashTagList)
  const [head_cnt, setHead_cnt] = useRecoilState(CodingMeetingHeadCount)
  const queryClient = useQueryClient()
  const { replace } = useRouter()
  const { user } = useClientSession()

  const { register, setFocus, handleSubmit } = useForm<CodingMeetingFormData>({
    defaultValues: { title: "", content: "" },
  })

  const { createCodingMeetingPost } =
    CodingMeetingQueries.useCreateCodingMeetingPost()

  const onSubmit = async (data: CodingMeetingFormData) => {
    if (!user)
      return toast.error(errorMessage.unauthorized, {
        toastId: "unauthorizedToCreateCodingMeeting",
        position: "top-center",
      })

    createCodingMeetingPost(
      {
        member_id: user.member_id,
        coding_meeting_title: data.title,
        coding_meeting_content: data.content,
        coding_meeting_hashtags: hash_tags,
        coding_meeting_location_id: "",
        coding_meeting_location_place_name: "",
        coding_meeting_location_longitude: "",
        coding_meeting_location_latitude: "",
        coding_meeting_member_upper_limit: Number(head_cnt),
        coding_meeting_start_time: "",
        coding_meeting_end_time: "",
      },
      {
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: ["chat"],
          })

          replace(`/chat/${res.data.data?.coding_meeting_token}`)

          setHash_tags([])
        },
      },
    )
  }

  const onInvalid = async (errors: FieldErrors<CodingMeetingFormData>) => {
    if (errors.title?.type === "required") {
      toast.error(errorMessage.notitle, {
        toastId: "emptyCodingMeetingTitle",
        position: "top-center",
      })

      window.scroll({
        top: 0,
        behavior: "smooth",
      })

      return
    }
  }

  if (!user) return

  return (
    <div className="w-[80%] m-auto">
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className={`transition-opacity duration-1000 m-auto`}
      >
        {/* title section */}
        <CodingMeetingSection className="border-transparent p-0">
          <Input
            id="title"
            spellCheck="false"
            autoComplete="off"
            fullWidth
            className="rounded-none border-r-0 border-l-0 border-t-0 text-3xl placeholder:text-3xl mt-10  "
            placeholder="제목"
            {...register("title", {
              required: true,
            })}
          />
        </CodingMeetingSection>
        <Spacing size={20} />
        <LocationSection />
        <Spacing size={20} />
        <HeadCountSection />
        <Spacing size={20} />
        <DateTimeSection />
        <Spacing size={20} />
        <HashTagsSection />
        <Spacing size={20} />
        <CodingMeetingSection>
          <CodingMeetingSection.Label htmlFor="content">
            소개글
          </CodingMeetingSection.Label>
          <div className="relative mt-3">
            <Textarea
              className="w-full min-h-[200px]"
              placeholder="개설하고자 하는 모각코를 설명해보세요."
              {...register("content", {
                required: true,
              })}
            />
          </div>
        </CodingMeetingSection>
        <Spacing size={20} />
        <div className="flex justify-center">
          <Button
            buttonTheme="primary"
            className="p-5 py-3 my-10"
            type="submit"
          >
            모각코 개설하기
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateCodingMeetingPage
