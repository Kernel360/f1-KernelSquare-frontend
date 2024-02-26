import queryKey from "@/constants/queryKey"
import type { CreateCodingMeetingRequest } from "@/interfaces/dto/coding-meeting/create-coding-meeting.dto"
import { createCodingMeeting } from "@/service/coding-meetings"
import { useMutation } from "@tanstack/react-query"

// 모각코 등록글 생성
const useCreateCodingMeetingPost = () => {
  const {
    data,
    mutate: createCodingMeetingPostMutate,
    isPending: isCodingMeetingPost,
    isError: isCodingMeetingPostError,
    isSuccess: isCodingMeetingPostSuccess,
  } = useMutation({
    mutationKey: [queryKey.chat],
    mutationFn: (createPayload: CreateCodingMeetingRequest) =>
      createCodingMeeting({
        ...createPayload,
      }),
  })

  return {
    createCodingMeetingPostResponse: data,
    createCodingMeetingPost: createCodingMeetingPostMutate,
    createCodingMeetingPostStatus: {
      isCodingMeetingPost,
      isCodingMeetingPostError,
      isCodingMeetingPostSuccess,
    },
  }
}

export const CodingMeetingQueries = {
  useCreateCodingMeetingPost,
}
