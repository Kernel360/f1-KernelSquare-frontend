export class RouteMap {
  private static baseURL = `/api/v1`
  private static prefix = {
    member: `members`,
    auth: "auth",
    question: "questions",
    answer: "answers",
    coffeeChat: "coffeechat",
    notice: "notices",
    faq: "faqs",
    search: "search",
    notification: "notification",
    images: "images",
  }
  private static routeGroupBaseURL = {
    member: `${RouteMap.baseURL}/${RouteMap.prefix.member}`,
    auth: `${RouteMap.baseURL}/${RouteMap.prefix.auth}`,
    question: `${RouteMap.baseURL}/${RouteMap.prefix.question}`,
    coffeeChat: `${RouteMap.baseURL}/${RouteMap.prefix.coffeeChat}`,
    notice: `${RouteMap.baseURL}/${RouteMap.prefix.notice}`,
    faq: `${RouteMap.baseURL}/${RouteMap.prefix.faq}`,
    search: `${RouteMap.baseURL}/${RouteMap.prefix.search}`,
    notification: `${RouteMap.baseURL}/${RouteMap.prefix.notification}`,
    images: `${RouteMap.baseURL}/${RouteMap.prefix.images}`,
  }

  /**
   * member api route 주소 얻기
   *
   * ---
   *
   * **getMember**: 특정멤버조회(GET)
   *
   * **updateMemberIntroduction**: 회원 소개 수정(PUT)
   *
   * **updateMemberProfileImage**: 회원 프로필 이미지 수정 (PUT)
   *
   * **updatePassword**: 회원 패스워드 수정(PUT)
   *
   * **withdraw**: 회원 탈퇴(DELETE)
   *
   * **reservation**: 회원 예약 목록 조회(GET)
   *
   * **getSelectableTechTag**: 선택 가능 기술 스택 조회(GET)
   *
   * **setTechTag**: 관심 기술 스택 선택(POST)
   */
  static member = {
    getMember(memberId?: number) {
      return `${RouteMap.routeGroupBaseURL.member}/${
        memberId === undefined ? ":id" : memberId
      }`
    },
    updateMemberIntroduction(memberId?: number) {
      return `${RouteMap.routeGroupBaseURL.member}/${
        memberId === undefined ? ":id" : memberId
      }/introduction`
    },
    updateMemberProfileImage(memberId?: number) {
      return `${RouteMap.routeGroupBaseURL.member}/${
        memberId === undefined ? ":id" : memberId
      }/profile`
    },
    updatePassword(memberId?: number) {
      return `${RouteMap.routeGroupBaseURL.member}/${
        memberId === undefined ? ":id" : memberId
      }/password`
    },
    withdraw(memberId?: number) {
      return `${RouteMap.routeGroupBaseURL.member}/${
        memberId === undefined ? ":id" : memberId
      }`
    },
    reservation(memberId?: number) {
      return `${RouteMap.routeGroupBaseURL.member}/${
        memberId === undefined ? ":id" : memberId
      }/reservation`
    },
    getSelectableTechTag(memberId?: number) {
      return `${RouteMap.routeGroupBaseURL.member}/${
        memberId === undefined ? ":id" : memberId
      }/subscribe`
    },
    setTechTag(memberId?: number) {
      return `${RouteMap.routeGroupBaseURL.member}/${
        memberId === undefined ? ":id" : memberId
      }/subscribe`
    },
  }

  /**
   * auth api route 주소 얻기
   *
   * ---
   *
   * **login**: 로그인(POST)
   *
   * **signup**: 회원가입(POST)
   *
   * **logout**: 로그아웃(POST)
   *
   * **duplicateCheckEmail**: 이메일 중복 체크(POST)
   *
   * **duplicateCheckNickname**: 닉네임 중복 체크(POST)
   *
   * **reissueAccessToken**: 액세스 토큰 재발급(POST)
   */
  static auth = {
    login: `${RouteMap.routeGroupBaseURL.auth}/login`,
    signup: `${RouteMap.routeGroupBaseURL.auth}/signup`,
    logout: `${RouteMap.routeGroupBaseURL.auth}/logout`,
    duplicateCheckEmail: `${RouteMap.routeGroupBaseURL.auth}/check/email`,
    duplicateCheckNickname: `${RouteMap.routeGroupBaseURL.auth}/check/nickname`,
    reissueAccessToken: `${RouteMap.routeGroupBaseURL.auth}/reissue`,
  }

  /**
   * question api route 주소 얻기
   *
   * ---
   *
   * **getQuestionList**: 모든 질문 조회(GET)
   *
   * **getQuestion**: 특정 질문 조회(GET)
   *
   * **createQuestion**: 질문 생성(POST)
   *
   * **updateQuestion**: 특정 질문 수정(PUT)
   *
   * **deleteQuestion**: 특정 질문 삭제(DELETE)
   */
  static question = {
    getQuestionList: `${RouteMap.routeGroupBaseURL.question}`,
    getQuestion(questionId?: number) {
      return `${RouteMap.routeGroupBaseURL.question}/${
        questionId === undefined ? ":id" : questionId
      }`
    },
    createQuestion: `${RouteMap.routeGroupBaseURL.question}`,
    updateQuestion(questionId?: number) {
      return `${RouteMap.routeGroupBaseURL.question}/${
        questionId === undefined ? ":id" : questionId
      }`
    },
    deleteQuestion(questionId?: number) {
      return `${RouteMap.routeGroupBaseURL.question}/${questionId ?? ":id"}`
    },
  }

  /**
   * answer api route 주소 얻기
   *
   * ---
   *
   * **getAnswer**: 특정 질문 모든 답변 조회(GET)
   *
   * **createAnswer**: 특정 질문 답변 생성(POST)
   *
   * **updateAnswer**: 답변 수정(PUT)
   *
   * **deleteAnswer**: 답변 삭제(PUT)
   *
   * **voteAnswer**: 답변 투표(POST)
   */
  static answer = {
    getAnswer(questionId?: number) {
      return `${RouteMap.routeGroupBaseURL.question}/${questionId ?? ":id"}/${
        RouteMap.prefix.answer
      }`
    },
    createAnswer(questionId?: number) {
      return `${RouteMap.routeGroupBaseURL.question}/${questionId ?? ":id"}/${
        RouteMap.prefix.answer
      }`
    },
    updateAnswer(answerId?: number) {
      return `${RouteMap.routeGroupBaseURL.question}/${
        RouteMap.prefix.answer
      }/${answerId ?? ":id"}`
    },
    deleteAnswer(answerId?: number) {
      return `${RouteMap.routeGroupBaseURL.question}/${
        RouteMap.prefix.answer
      }/${answerId ?? ":id"}`
    },
    voteAnswer(answerId?: number) {
      return `${RouteMap.routeGroupBaseURL.question}/${
        RouteMap.prefix.answer
      }/${answerId ?? ":id"}/vote`
    },
  }

  /**
   * coffee chat api route 주소 얻기
   *
   * ---
   *
   * **getCoffeeChatList**: 모든 커피챗 등록글 조회(GET)
   *
   * **createCoffeeChatPost**: 커피챗 등록글 생성(POST)
   *
   * **updateCoffeeChatPost**: 커피챗 등록글 수정(PUT)
   *
   * **deleteCoffeeChatPost**: 커피챗 등록글 삭제(DELETE)
   *
   * **getCoffeeChatDetail**: 커피챗 등록글 상세보기(GET)
   *
   * **getCoffeeChatReservationInfo** 커피챗 예약 화면(GET)
   *
   * **coffeeChatReservation** 커피챗 예약(POST)
   *
   * **deleteCoffeeChatReservation** 커피챗 예약 삭제(DELETE)
   *
   * **reviewCoffeeChat** 커피챗 리뷰(POST)
   *
   * **enterCoffeeChatRoom** 채팅방 입장(POST)
   */
  static coffeeChat = {
    getCoffeeChatList: `${RouteMap.routeGroupBaseURL.coffeeChat}/posts`,
    createCoffeeChatPost: `${RouteMap.routeGroupBaseURL.coffeeChat}/posts`,
    updateCoffeeChatPost(postId: number) {
      return `${RouteMap.routeGroupBaseURL.coffeeChat}/posts/${postId}`
    },
    deleteCoffeeChatPost(postId?: number) {
      return `${RouteMap.routeGroupBaseURL.coffeeChat}/posts/${postId ?? ":id"}`
    },
    getCoffeeChatDetail(postId?: number) {
      return `${RouteMap.routeGroupBaseURL.coffeeChat}/posts/${postId ?? ":id"}`
    },
    getCoffeeChatReservationInfo(postId: number) {
      return `${RouteMap.routeGroupBaseURL.coffeeChat}/posts/${postId}/reservation`
    },
    getMyCoffeeChatReservation: `${RouteMap.routeGroupBaseURL.coffeeChat}/reservations`,
    coffeeChatReservation: `${RouteMap.routeGroupBaseURL.coffeeChat}/reservations/book`,
    deleteCoffeeChatReservation(reservationId?: number) {
      return `${RouteMap.routeGroupBaseURL.coffeeChat}/${
        reservationId ?? ":id"
      }`
    },
    reviewCoffeeChat(postId: number) {
      return `${RouteMap.routeGroupBaseURL.coffeeChat}/posts/${postId}/review`
    },
    enterCoffeeChatRoom: `${RouteMap.routeGroupBaseURL.coffeeChat}/rooms/enter`,
  }

  /**
   * notice api route 주소 얻기
   *
   * ---
   *
   * **getNoticeList**: 모든 공지 조회(GET)
   *
   * **getNotice**: 특정 공지 조회(GET)
   *
   * **createNotice**: 공지 생성(POST)
   *
   * **updateNotice**: 공지 수정(PUT)
   *
   * **deleteNotice**: 공지 삭제(DELETE)
   */
  static notice = {
    getNoticeList: `${RouteMap.routeGroupBaseURL.notice}`,
    getNotice(noticeId: number) {
      return `${RouteMap.routeGroupBaseURL.notice}/${noticeId}`
    },
    createNotice: `${RouteMap.routeGroupBaseURL.notice}`,
    updateNotice(noticeId: number) {
      return `${RouteMap.routeGroupBaseURL.notice}/${noticeId}`
    },
    deleteNotice(noticeId: number) {
      return `${RouteMap.routeGroupBaseURL.notice}/${noticeId}`
    },
  }

  /**
   * faq api route 주소 얻기
   *
   * ---
   *
   * **getFAQList**: 모든 FAQ 조회(GET)
   *
   * **getFAQ**: 특정 FAQ 조회(GET)
   *
   * **createFAQ**: FAQ 생성(POST)
   *
   * **updateFAQ**: FAQ 수정(PUT)
   *
   * **deleteFAQ**: FAQ 삭제(DELETE)
   *
   * **inquiry**: 문의하기(GET)
   */
  static faq = {
    getFAQList: `${RouteMap.routeGroupBaseURL.faq}`,
    getFAQ(faqId: number) {
      return `${RouteMap.routeGroupBaseURL.faq}/${faqId}`
    },
    createFAQ: `${RouteMap.routeGroupBaseURL.faq}`,
    updateFAQ(faqId: number) {
      return `${RouteMap.routeGroupBaseURL.faq}/${faqId}`
    },
    deleteFAQ(faqId: number) {
      return `${RouteMap.routeGroupBaseURL.faq}/${faqId}`
    },
    inquiry: `${RouteMap.routeGroupBaseURL.faq}/inquiry`,
  }

  /**
   * search api route 주소 얻기
   *
   * ---
   *
   * **getSearch**: 검색(GET)
   */
  static search = {
    getSearchQuestions: `${RouteMap.routeGroupBaseURL.search}/questions`,
  }

  /**
   * notification api route 주소 얻기
   *
   * ---
   *
   * **getNotification**: 알림 조회(GET)
   */
  static notification = {
    getNotification: `${RouteMap.routeGroupBaseURL.notification}`,
  }

  /**
   * images api route 주소 얻기
   *
   * ---
   *
   * uploadImages: 이미지 업로드 (post)
   * deleteImages: 이미지 삭제 (delete)
   */
  static images = {
    uploadImages: `${RouteMap.routeGroupBaseURL.images}`,
    deleteImages: `${RouteMap.routeGroupBaseURL.images}`,
  }
}
