import { COFFEE_CHAT_LIMITS, HASHTAG_LIMITS } from "../limitation"

export const validationMessage = {
  notitle: "제목을 작성해주세요",
  noContent: "본문 내용을 작성해주세요",
  voteForMe: "자신의 답변에는 투표할 수 없습니다.",
  hashTag: {
    emptyValue: "값이 비어있습니다. 정확한 값을 입력해주세요.",
    maximumHashTagsLength: `해시태그는 최대 ${HASHTAG_LIMITS.tags.maxLength}개까지 입력 가능합니다.`,
    maximumHashTagTextLength: `해시태그는 최대 ${HASHTAG_LIMITS.tag.maxLength}자까지 입력 가능합니다.`,
    includeSpecialCharacter: `문자와 숫자만 입력 가능합니다.`,
    duplicatedHashTag: "이미 입력된 값입니다.",
  },
  coffeeChat: {
    maximumReservationTimeLength: `커피챗 시간은 최대 ${COFFEE_CHAT_LIMITS.mentoringTime.maxLength}개까지 선택 가능합니다.`,
    emptyReservationTime: "커피챗 시간은 최소 하나 이상 선택해야 합니다.",
  },
} as const
