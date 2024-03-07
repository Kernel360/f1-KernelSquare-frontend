"use client"

import { errorMessage } from "@/constants/message"
import { useClientSession } from "@/hooks/useClientSession"
import { CodingMeetingHashTagList } from "@/recoil/atoms/coding-meeting/hashtags"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { FieldErrors, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useRecoilState, useRecoilValue } from "recoil"
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
import { DirectionIcons } from "@/components/icons/Icons"
import { EndTime, StartTime } from "@/recoil/atoms/coding-meeting/dateTime"
import { LocationForSubmit } from "@/recoil/atoms/coding-meeting/mapData"
import Limitation from "@/constants/limitation"
import type { CodingMeetingDetailPayload } from "@/interfaces/dto/coding-meeting/get-coding-meeting-detail.dto"
import NotFound from "@/app/not-found"
import { revalidatePage } from "@/util/actions/revalidatePage"
import queryKey from "@/constants/queryKey"
import useHandleCreateCodingMeetingTime from "./hooks/useHandleCreateCodingMeetingTime"
import { AxiosError } from "axios"
import { APIResponse } from "@/interfaces/dto/api-response"
import TextCounter from "@/components/shared/TextCounter"
import { twJoin } from "tailwind-merge"

interface CreateCodingMeetingPageProps {
  editMode: "create" | "update"
  initialValues?: CodingMeetingDetailPayload
  coding_meeting_token?: string
}

interface CodingMeetingFormData {
  title: string
  content: string
}

const CreateCodingMeetingPage = ({
  editMode,
  initialValues,
  coding_meeting_token,
}: CreateCodingMeetingPageProps) => {
  const [hash_tags, setHash_tags] = useRecoilState(CodingMeetingHashTagList)
  const [head_cnt, setHead_cnt] = useRecoilState(CodingMeetingHeadCount)
  const startTime = useRecoilValue(StartTime)
  const endTime = useRecoilValue(EndTime)
  const [location, setLocation] = useRecoilState(LocationForSubmit)
  const queryClient = useQueryClient()
  const { replace } = useRouter()
  const { user } = useClientSession()
  const {
    resetDateTimes,
    formatTime,
    formatByUTC,
    formattedStartTime,
    formattedEndTime,
  } = useHandleCreateCodingMeetingTime()

  const { register, handleSubmit, watch, getValues } =
    useForm<CodingMeetingFormData>(
      initialValues
        ? {
            defaultValues: {
              title: initialValues.coding_meeting_title,
              content: initialValues.coding_meeting_content,
            },
          }
        : {},
    )

  const { createCodingMeetingPost } =
    CodingMeetingQueries.useCreateCodingMeeting()
  const { updateCodingMeeting } = CodingMeetingQueries.useUpdateCodingMeeting()

  const goToListPage = () => replace("/coding-meetings")

  const onSubmit = async (data: CodingMeetingFormData) => {
    // 사용자 권한 인증
    if (!user)
      return toast.error(errorMessage.unauthorized, {
        toastId: "unauthorizedToCreateCodingMeeting",
        position: "top-center",
      })
    // 장소 유효성 검사
    if (!location)
      return toast.error(errorMessage.noLocation, {
        toastId: "emptyLocation",
        position: "top-center",
      })
    // 인원수 유효성 검사
    if (head_cnt === "0")
      return toast.error(errorMessage.noHeadCnt, {
        toastId: "emptyHeadCnt",
        position: "top-center",
      })
    // 시간 유효성 검사
    // 시간 값이 없을 경우
    if (!startTime || !endTime)
      return toast.error(errorMessage.noTime, {
        toastId: "emptyCodingMeetingTime",
        position: "top-center",
      })
    // 종료 시간이 시작 시간보다 빠를 경우
    if (formattedEndTime.isBefore(formattedStartTime))
      return toast.error(errorMessage.timeError, {
        toastId: "codingMeetingTimeError",
        position: "top-center",
      })
    // 시작 시간이 종료 시간과 같을 경우
    if (formattedEndTime.isSame(formattedStartTime, "minute"))
      return toast.error(errorMessage.sameTime, {
        toastId: "codingMeetingSameTimeError",
        position: "top-center",
      })

    const payload = {
      coding_meeting_title: data.title,
      coding_meeting_content: data.content,
      coding_meeting_hashtags: hash_tags,
      coding_meeting_location_id: location?.coding_meeting_location_id,
      coding_meeting_location_place_name:
        location.coding_meeting_location_place_name,
      coding_meeting_location_longitude:
        location.coding_meeting_location_longitude,
      coding_meeting_location_latitude:
        location.coding_meeting_location_latitude,
      coding_meeting_member_upper_limit: Number(head_cnt),
      coding_meeting_start_time: formatByUTC(formatTime(startTime)),
      coding_meeting_end_time: formatByUTC(formatTime(endTime)),
    }

    if (editMode === "create") {
      createCodingMeetingPost(payload, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: [queryKey.codingMeeting],
          })

          replace(`/coding-meetings/${res.data.data?.coding_meeting_token}`)

          setHash_tags([])
          setHead_cnt("3")
          resetDateTimes()
          setLocation(undefined)
        },
        onError: (error: Error | AxiosError<APIResponse>) => {
          if (error instanceof AxiosError) {
            const { response } = error as AxiosError<APIResponse>

            toast.error(
              response?.data.msg ?? errorMessage.failToCreateCodingMeeting,
              {
                toastId: "failToCreateCodingMeeting",
                position: "top-center",
                autoClose: 1000,
              },
            )
            return
          }

          toast.error(errorMessage.failToCreateCodingMeeting, {
            toastId: "failToCreateCodingMeeting",
            position: "top-center",
            autoClose: 1000,
          })
        },
      })
    }

    if (!coding_meeting_token) {
      return NotFound()
    }

    if (editMode === "update") {
      const editPayload = {
        ...payload,
        coding_meeting_token,
      }
      updateCodingMeeting(editPayload, {
        onSuccess: async (res) => {
          queryClient.resetQueries({
            queryKey: [queryKey.codingMeeting],
          })

          await revalidatePage("/coding-meetings/[token]", "page")

          setTimeout(() => {
            replace(`/coding-meetings/${coding_meeting_token}`)

            setHash_tags([])
            setHead_cnt("3")
            resetDateTimes()
            setLocation(undefined)
          }, 0)
        },
        onError: (error: Error | AxiosError<APIResponse>) => {
          if (error instanceof AxiosError) {
            const { response } = error as AxiosError<APIResponse>

            toast.error(
              response?.data.msg ?? errorMessage.failToUpdateCodingMeeting,
              {
                toastId: "failToUpdateCodingMeeting",
                position: "top-center",
                autoClose: 1000,
              },
            )
            return
          }

          toast.error(errorMessage.failToUpdateCodingMeeting, {
            toastId: "failToUpdateCodingMeeting",
            position: "top-center",
            autoClose: 1000,
          })
        },
      })
    }
  }
  const onInvalid = async (errors: FieldErrors<CodingMeetingFormData>) => {
    if (errors?.title) {
      const titleErrorMessage = ((type: typeof errors.title.type) => {
        switch (type) {
          case "required":
            return errorMessage.notitle
          case "minLength":
            return errorMessage.underTitleLimit
          case "maxLength":
            return errorMessage.overTitleLimit
        }
      })(errors.title.type)

      toast.error(titleErrorMessage, {
        position: "top-center",
        toastId: "createCodingMeetingTitle",
      })

      window.scroll({
        top: 0,
        behavior: "smooth",
      })

      return
    }

    if (errors?.content) {
      const contentErrorMessage = ((type: typeof errors.content.type) => {
        switch (type) {
          case "required":
            return errorMessage.noContent
          case "minLength":
            return errorMessage.underContentLimit
          case "maxLength":
            return errorMessage.overContentLimit
        }
      })(errors.content.type)

      toast.error(contentErrorMessage, {
        position: "top-center",
        toastId: "createCodingMeetingContent",
      })
      return
    }
  }

  const TitleInputClass = twJoin([
    "text-base placeholder:text-base",
    watch("title") &&
      (watch("title")?.length < Limitation.title_limit_under ||
        watch("title")?.length > Limitation.title_limit_over) &&
      "focus:border-danger border-danger",
  ])

  return (
    <div className="w-[80%] m-auto">
      <div
        className="flex text-[#828282] items-center mt-10 cursor-pointer w-[100px]"
        onClick={goToListPage}
      >
        <DirectionIcons.LeftLine className="text-2xl" />
        <div className="text-base">목록 보기</div>
      </div>
      <div className="text-[32px] font-bold p-6">모각코 모집하기</div>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className={`transition-opacity duration-1000 m-auto`}
      >
        <CodingMeetingSection>
          <CodingMeetingSection.Label htmlFor="title">
            제목
          </CodingMeetingSection.Label>
          <div className="w-full">
            <Input
              id="title"
              spellCheck="false"
              autoComplete="off"
              fullWidth
              className={TitleInputClass}
              placeholder="제목을 입력해주세요"
              {...register("title", {
                required: true,
                minLength: Limitation.title_limit_under,
                maxLength: Limitation.title_limit_over,
              })}
            />
            <div>
              {watch("title") &&
                (watch("title")?.length < Limitation.title_limit_under ||
                  watch("title")?.length > Limitation.title_limit_over) && (
                  <Input.ErrorMessage className="text-md">
                    {"제목은 5자 이상 100자 이하여야 합니다."}
                  </Input.ErrorMessage>
                )}
            </div>
          </div>
        </CodingMeetingSection>
        <Spacing size={10} />
        <LocationSection
          initialLocation={
            initialValues && {
              coding_meeting_location_id:
                initialValues.coding_meeting_location_id,
              coding_meeting_location_place_name:
                initialValues.coding_meeting_location_place_name,
              coding_meeting_location_latitude:
                initialValues.coding_meeting_location_latitude,
              coding_meeting_location_longitude:
                initialValues.coding_meeting_location_longitude,
            }
          }
        />
        <Spacing size={10} />
        <HeadCountSection
          initialCnt={
            initialValues &&
            initialValues?.coding_meeting_member_upper_limit + ""
          }
        />
        <Spacing size={10} />
        <DateTimeSection
          initialDateTime={
            initialValues && {
              coding_meeting_start_time:
                initialValues?.coding_meeting_start_time,
              coding_meeting_end_time: initialValues?.coding_meeting_end_time,
            }
          }
        />
        <Spacing size={10} />
        <HashTagsSection
          initialHashTags={
            initialValues && initialValues?.coding_meeting_hashtags
          }
        />
        <Spacing size={10} />
        <CodingMeetingSection>
          <CodingMeetingSection.Label htmlFor="content">
            소개글
          </CodingMeetingSection.Label>
          <div className="w-full">
            <Textarea
              className="w-full min-h-[200px]"
              placeholder="모집글의 내용을 작성해주세요 (최대 10,000자)"
              {...register("content", {
                required: true,
                minLength: Limitation.content_limit_under,
                maxLength: Limitation.content_limit_over,
              })}
            />
          </div>
        </CodingMeetingSection>
        <div>
          <TextCounter
            text={watch("content") ?? ""}
            min={Limitation.content_limit_under}
            max={Limitation.content_limit_over}
            className="text-lg block text-right h-2 mr-5"
          />
        </div>
        <Spacing size={10} />
        <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center w-full p-6 sm:p-0 sm:mr-5">
          <Button
            disabled={
              !user ||
              !location ||
              head_cnt === "0" ||
              !startTime ||
              !endTime ||
              !watch("content") ||
              watch("content").length < Limitation.answer_limit_under ||
              watch("content").length > Limitation.answer_limit_over ||
              !getValues("title") ||
              getValues("title").length < Limitation.title_limit_under ||
              getValues("title").length > Limitation.title_limit_over
            }
            buttonTheme="primary"
            className="block sm:inline-flex sm:w-[150px] w-full p-5 py-3 my-10 disabled:bg-colorsGray disabled:text-colorsDarkGray"
            type="submit"
          >
            {editMode === "update" ? "모각코 수정하기" : "모각코 개설하기"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateCodingMeetingPage
