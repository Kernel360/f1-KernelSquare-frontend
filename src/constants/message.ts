export const errorMessage = {
  noContent: "본문 내용을 작성해주세요",
  introductionLimit: "최대 300자까지 입력 가능합니다.",
  imageUploadLimit: "이미지 파일 업로드는 1장만 가능합니다",
  unauthorized: "로그인 후 다시 이용해주세요",
  failToUploadImage:
    "이미지 업로드 중 오류가 발생하였습니다. 다시 시도해주세요.",
  emptyCookie: "쿠키가 비어있습니다.",
} as const

export const successMessage = {
  editProfileImage: "프로필 이미지 변경에 성공했습니다.",
  editIntroduction: "자기소개 수정에 성공했습니다.",
} as const

export const notificationMessage = {
  noAnswer:
    "아직 작성된 답변이 존재하지 않습니다. 첫 번째 답변의 주인공이 되어보세요!",
  myQuestion: "아직 작성된 답변이 존재하지 않습니다.",
  cancleUploadImage: "사진 저장이 취소되었습니다.",
} as const

export const confirmMessage = {
  editProfileImage: "변경된 사진으로 저장하시겠습니까?",
  deleteContent: "정말 삭제하시겠습니까?",
} as const
