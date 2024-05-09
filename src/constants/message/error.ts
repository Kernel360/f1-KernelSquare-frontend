const ERROR = " 중 오류가 발생하였습니다. 다시 시도해주세요."

export const commonErrorMessage = {
  tryAgain: "잠시 후 다시 시도해주세요.",
  saySorry: "이용에 불편을 드려 죄송해요.",
}

export const errorMessage = {
  uploadImage: "이미지 업로드" + ERROR,
  resetImage: "이미지 초기화" + ERROR,
  uploadIntroduction: "자기소개글 수정" + ERROR,
  vote: "투표 진행" + ERROR,
  searchLocation: "장소 검색" + ERROR,
  createCoffeeChat: "커피챗 모집글 생성" + ERROR,
  deleteAnswer: "답변 삭제" + ERROR,
  deleteQuestion: "질문 삭제" + ERROR,
  deleteCodingMeeting: "모각코 게시물 삭제" + ERROR,
  updateAnswer: "답변 수정" + ERROR,
  reserveCoffeeChat: "커피챗 예약" + ERROR,
  cancelReservation: "커피챗 예약 취소" + ERROR,
  deleteChatReservation: "커피챗 게시글 삭제 중 오류가 발생했습니다.",
  createCodingMeeting: "모각코 생성" + ERROR,
  updateCodingMeeting: "모각코 수정" + ERROR,
} as const
