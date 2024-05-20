"use client"

import { FieldErrors, useFormContext } from "react-hook-form"
import { toast } from "react-toastify"
import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import HashTagsSection from "./components/section/hash-tags/HashTagsSection"
import DateTimeSection from "./components/section/date-time/DateTimeSection"
import { CodingMeetingFormData, CodingMeetingPageMode } from "@/interfaces/form"
import TitleSection from "./components/section/title/TitleSection"
import LocationSection from "./components/section/location/LocationSection"
import MemberCountSection from "./components/section/member-count/MemberCountSection"
import ContentSection from "./components/section/content/ContentSection"
import LinkToListPage from "@/components/LinkToListPage"
import { pickFirstError } from "@/util/hook-form/error"
import { useCreateCodingMeeting } from "./hooks/useCreateCodingMeeting"
import { formDataToPayload, payloadToFormData } from "../util/parser"
import { useUpdateCodingMeeting } from "./hooks/useUpdateCodingMeeting"
import { CodingMeetingDetailPayload } from "@/interfaces/dto/coding-meeting/get-coding-meeting-detail.dto"

interface CreateCodingMeetingPageProps {
  editMode: CodingMeetingPageMode
  coding_meeting_token?: string
  initialCodingMeeting?: CodingMeetingDetailPayload
}

function CreateCodingMeetingPage(props: { editMode: "create" }): JSX.Element
function CreateCodingMeetingPage(props: {
  editMode: "update"
  coding_meeting_token: string
  initialCodingMeeting: CodingMeetingDetailPayload
}): JSX.Element
function CreateCodingMeetingPage({
  editMode,
  coding_meeting_token,
  initialCodingMeeting,
}: CreateCodingMeetingPageProps): JSX.Element {
  const { handleSubmit } = useFormContext<CodingMeetingFormData>()

  const { createCodingMeetingApi, createCodingMeetingApiStatus } =
    useCreateCodingMeeting()

  const { updateCodingMeetingApi, updateCodingMeetingApiStatus } =
    useUpdateCodingMeeting()

  const initialFormData = initialCodingMeeting
    ? payloadToFormData(initialCodingMeeting)
    : null

  const onSubmit = async (formData: CodingMeetingFormData) => {
    if (editMode === "create") {
      createCodingMeetingApi(formDataToPayload("create", formData))
      return
    }

    // update
    updateCodingMeetingApi(
      formDataToPayload("update", formData, coding_meeting_token!),
    )
  }

  const onInvalid = async (errors: FieldErrors<CodingMeetingFormData>) => {
    const error = pickFirstError<CodingMeetingFormData>(errors)

    toast.error(error.message, {
      position: "top-center",
      toastId: "codingMeetingInvalidForm",
    })
  }

  return (
    <div className="px-6 py-6 sm:px-12 sm:pt-8 sm:pb-12 pc:pt-[72px] pc:pl-[80px] pc:pr-[24px] xl:!pr-[40px] pc:pb-[42px]">
      <div className="hidden pc:block">
        <LinkToListPage to="coding-meetings" />
        <Spacing size={48} />
      </div>
      <h3 className="text-2xl pc:text-[32px] font-bold mb-8 pc:mb-14">
        {editMode === "create" ? "모각코 모집하기" : "모각코 수정하기"}
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className={`transition-opacity duration-1000 m-auto`}
      >
        <div className="flex w-full flex-col gap-8">
          <TitleSection
            {...(initialFormData && { initialTitle: initialFormData.title })}
          />
          <LocationSection
            {...(initialFormData && {
              initialLocation: initialFormData.location,
            })}
          />
          <MemberCountSection
            {...(initialFormData && {
              initialMemberCount: initialFormData.member_upper_limit,
            })}
          />
          <DateTimeSection
            {...(initialFormData && { initialDateTime: initialFormData.date })}
          />
          <HashTagsSection
            {...(initialFormData && {
              initialHashTags: initialFormData.hashtags,
            })}
          />
          <ContentSection
            {...(initialFormData && {
              initialContent: initialFormData.content,
            })}
          />
        </div>
        <Spacing size={10} />
        <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center w-full p-6 sm:p-0 sm:pr-[20px]">
          <Button
            buttonTheme="primary"
            className="block sm:inline-flex sm:w-[150px] w-full p-5 py-3 my-10 disabled:bg-[#E0E0E0] disabled:text-[#BDBDBD] disabled:pointer-events-none"
            type="submit"
            disabled={
              createCodingMeetingApiStatus === "pending" ||
              updateCodingMeetingApiStatus === "pending"
            }
          >
            {buttonText({
              editMode,
              loading:
                createCodingMeetingApiStatus === "pending" ||
                updateCodingMeetingApiStatus === "pending",
            })}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateCodingMeetingPage

const buttonText = ({
  editMode,
  loading,
}: {
  editMode: CodingMeetingPageMode
  loading: boolean
}) => {
  if (editMode === "create") {
    return loading ? "모각코 개설하는 중" : "모각코 개설하기"
  }

  return loading ? "모각코 수정하는 중" : "모각코 수정하기"
}
