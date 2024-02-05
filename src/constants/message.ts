import Limitation from "./limitation"

export const errorMessage = {
  notitle: "제목을 작성해주세요",
  noContent: "본문 내용을 작성해주세요",
  introductionLimit: "최대 300자까지 입력 가능합니다.",
  imageUploadLimit: "이미지 파일 업로드는 1장만 가능합니다",
  unauthorized: "로그인 후 다시 이용해주세요",
  failToUploadImage:
    "이미지 업로드 중 오류가 발생하였습니다. 다시 시도해주세요.",
  failToResetImage:
    "이미지 초기화 중 오류가 발생하였습니다. 다시 시도해주세요.",
  emptyCookie: "쿠키가 비어있습니다.",
  deleteAnswer: "답변 삭제 중 오류가 발생하였습니다.",
  deleteQuestion: "질문 삭제 중 오류가 발생하였습니다.",
  updateAnswer: "답변 수정 중 오류가 발생하였습니다.",
  tryAgain: "잠시 후 다시 시도해주세요.",
  saySorry: "이용에 불편을 드려 죄송해요.",
  duplicatedVote: "답변에 대한 투표는 한 번만 진행할 수 있습니다.",
  failToReserve: "커피챗 예약 중 오류가 발생하였습니다. 다시 시도해주세요.",
  alreadyReserved: "이미 예약된 시간대입니다.",
  alreadySelected: "이미 선택된 시간대입니다.",
  youAlreadyReserved: "이미 동일한 멘토링을 예약하셨습니다.",
  noValue: "값이 비어있습니다. 정확한 값을 입력해주세요.",
  overHashtagCntLimit: `해시태그는 최대 ${Limitation.hashtags_cnt}개까지 입력 가능합니다.`,
  overHashtagWordLimit: `해시태그는 최대 ${Limitation.hashtags_word}자까지 입력 가능합니다.`,
  overtimeCntLimit: `멘토링 시간은 최대 ${Limitation.mentoring_time}개까지 선택 가능합니다.`,
  undertimeCntLimit: "멘토링 시간은 최소 하나 이상 선택해야 합니다.",
  preventSpecialCharacter: `문자와 숫자만 입력 가능합니다.`,
  preventDuplicateValue: "이미 입력된 값입니다.",
} as const

export const successMessage = {
  editProfileImage: "프로필 이미지 변경에 성공했습니다.",
  editResetProfileImage: "프로필 이미지 초기화에 성공했습니다.",
  editIntroduction: "자기소개 수정에 성공했습니다.",
  deleteAnswer: "답변이 삭제되었습니다.",
  createAnswer: "답변이 생성되었습니다.",
  updateAnswer: "답변이 수정되었습니다.",
  deleteQuestion: "질문이 삭제되었습니다.",
  deleteCoffeeChatPost: "커피챗 게시글이 삭제되었습니다.",
  deleteCoffeeChatReservation: "커피챗 예약이 취소되었습니다.",
  cancleVote: "투표 기록이 삭제되었습니다.",
  reserveCoffeeChat: "커피챗 예약에 성공했습니다.",
  createCoffeeChatPost: "커피챗 등록글 생성에 성공했습니다.",
} as const

export const notificationMessage = {
  noAnswer:
    "아직 작성된 답변이 존재하지 않습니다. 첫 번째 답변의 주인공이 되어보세요!",
  noIntroduction:
    "마이페이지에 자기소개글을 작성하여 다른 사용자들에게 나를 소개하고 더 많은 사용자들과 소통해보세요.",
  myQuestion: "아직 작성된 답변이 존재하지 않습니다.",
  noSearchResult: "검색어와 일치하는 결과가 없습니다.",
  cancleUploadImage: "사진 저장이 취소되었습니다.",
  cancleResetImage: "프로필 이미지 초기화가 취소되었습니다.",
  cancleDeleteAnswer: "답변 삭제가 취소되었습니다.",
  cancleDeleteQuestion: "질문 삭제가 취소되었습니다.",
  cancleDeleteVote: "투표 기록 삭제가 취소되었습니다.",
  cancleDeleteCoffeeChatPost: "커피챗 게시글 삭제가 취소되었습니다.",
  cancleEditIntroduction: "자기소개 수정이 취소되었습니다.",
  answerWithoutToken: "로그인하고 질문에 대한 답변을 남겨보세요!",
  cancleReservation: "커피챗 예약이 취소되었습니다.",
} as const

export const confirmMessage = {
  editProfileImage: "변경된 사진으로 저장하시겠습니까?",
  resetProfileImage: "기본 이미지로 초기화하시겠습니까?",
  deleteContent: "정말 삭제하시겠습니까?",
  cancleVote: "투표 기록을 삭제하시겠습니까?",
  reserveCoffeeChat: "해당 일정으로 예약하시겠습니까?",
  deleteCoffeeChat: "해당 일정을 삭제하시겠습니까?",
} as const

export const loadingMessage = {
  deleteAnswer: "답변 삭제가 진행 중이에요.",
} as const

export const buttonMessage = {
  goToLogIn: "로그인 하러 가기",
  postMyAnswer: "답변 남기기",
  scrollToTop: "TOP",
  updateProfile: "이미지 변경",
  resetProfile: "이미지 초기화",
  edit: "수정하기",
  delete: "삭제하기",
  cancle: "취소",
  save: "저장",
} as const

export const searchTipMessage = [
  "단어의 철자가 정확한지 확인해주세요.",
  "조금 더 일반적인 단어로 다시 검색해보세요.",
  "검색하는 단어의 수를 줄여보세요.",
] as const
