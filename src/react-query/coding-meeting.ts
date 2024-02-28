import queryKey from "@/constants/queryKey"
import type { CreateCodingMeetingRequest } from "@/interfaces/dto/coding-meeting/create-coding-meeting.dto"
import { UpdateCodingMeetingRequest } from "@/interfaces/dto/coding-meeting/update-coding-meeting.dto"
import {
  createCodingMeeting,
  updateCodingMeeting,
} from "@/service/coding-meetings"
import { useMutation } from "@tanstack/react-query"

// 모각코 등록글 생성
const useCreateCodingMeeting = () => {
  const {
    data,
    mutate: createCodingMeetingMutate,
    isPending: isCreateCodingMeeting,
    isError: isCreateCodingMeetingPostError,
    isSuccess: isCreateCodingMeetingPostSuccess,
  } = useMutation({
    mutationKey: [queryKey.codingMeeting],
    mutationFn: (createPayload: CreateCodingMeetingRequest) =>
      createCodingMeeting({
        ...createPayload,
      }),
  })

  return {
    createCodingMeetingPostResponse: data,
    createCodingMeetingPost: createCodingMeetingMutate,
    createCodingMeetingPostStatus: {
      isCreateCodingMeeting,
      isCreateCodingMeetingPostError,
      isCreateCodingMeetingPostSuccess,
    },
  }
}

// 모각코 등록글 수정
const useUpdateCodingMeeting = () => {
  const {
    data,
    mutate: updateCodingMeetingMutate,
    isPending: isUpdateCodingMeeting,
    isError: isUpdateCodingMeetingError,
    isSuccess: isUpdateCodingMeetingSuccess,
  } = useMutation({
    mutationKey: [queryKey.codingMeeting],
    mutationFn: (updatePayload: UpdateCodingMeetingRequest) =>
      updateCodingMeeting({ ...updatePayload }),
  })

  return {
    updateCodingMeetingResponse: data,
    updateCodingMeeting: updateCodingMeetingMutate,
    updateCodingMeetingStatus: {
      isUpdateCodingMeeting,
      isUpdateCodingMeetingError,
      isUpdateCodingMeetingSuccess,
    },
  }
}

export const CodingMeetingQueries = {
  useCreateCodingMeeting,
  useUpdateCodingMeeting,
}
