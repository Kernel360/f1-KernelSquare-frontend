export type MessageKey = keyof typeof ConfirmModalMessage

const ConfirmModalMessage = {
  editProfileImage: "변경된 사진으로 저장하시겠습니까?",
  resetProfileImage: "기본 이미지로 초기화하시겠습니까?",
  deleteContent: "정말 삭제하시겠습니까?",
  cancleVote: "투표 기록을 삭제하시겠습니까?",
  reserveCoffeeChat: "해당 일정으로 예약하시겠습니까?",
  deleteCoffeeChatBeforeDue: `예약된 커피챗을 취소하시겠습니까?`,
  deleteCoffeeChatAfterDue: `취소 시 패널티가 부여될 수 있습니다.\n그래도 취소하시겠습니까?`,
} as const

export default ConfirmModalMessage
