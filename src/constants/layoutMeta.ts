import { AppleImage } from "next/dist/lib/metadata/types/extra-types"

export type LayoutMetaKey =
  | "/"
  | "qna"
  | "coding-meetings"
  | "question"
  | "updateQuestion"
  | "signup"
  | "login"
  | "chat"
  | "chat/popup"
  | "faq"
  | "profile"
  | "userProfile"
  | "search"
  | "oauth"
  | "notification"

export type LayoutMeta = {
  title: string
  description: string
  containLayout: {
    header: boolean
    navigation: boolean
    footer: boolean
  }
}

export const NOTMATCH_SEGMENT = "__DEFAULT__"

export const layoutMeta = {
  "/": {
    title: "홈",
    description: "커널 스퀘어에 오신 것을 환영합니다",
    containLayout: {
      header: false,
      navigation: false,
      footer: false,
    },
  },
  qna: {
    title: "개발자 Q&A",
    description: "커널 스퀘어 개발자 Q&A",
    containLayout: {
      header: true,
      navigation: true,
      footer: false,
    },
  },
  "coding-meetings": {
    title: "모각코",
    description: "모여서 각자 코딩",
    containLayout: {
      header: true,
      navigation: true,
      footer: false,
    },
  },
  question: {
    title: "개발자 Q&A",
    description: "Q&A",
    containLayout: {
      header: true,
      navigation: true,
      footer: false,
    },
  },
  updateQuestion: {
    title: "질문 수정",
    description: "질문 수정",
    containLayout: {
      header: true,
      navigation: true,
      footer: false,
    },
  },
  signup: {
    title: "회원가입",
    description: "커널스퀘어의 멤버가 되어 지속 가능한 성장을 경험해 보세요",
    containLayout: {
      header: false,
      navigation: false,
      footer: false,
    },
  },
  login: {
    title: "로그인",
    description: "커널스퀘어에 로그인하고 다양한 서비스를 이용해 보세요",
    containLayout: {
      header: false,
      navigation: false,
      footer: false,
    },
  },
  chat: {
    title: "커피챗",
    description: "커피챗을 통해 지속 가능한 성장을 경험해 보세요",
    containLayout: {
      header: true,
      navigation: true,
      footer: false,
    },
  },
  "chat/popup": {
    title: "커피챗:채팅",
    description: "커피챗:채팅",
    containLayout: {
      header: false,
      navigation: false,
      footer: false,
    },
  },
  faq: {
    title: "FAQ",
    description: "FAQ",
    containLayout: {
      header: true,
      navigation: true,
      footer: false,
    },
  },
  profile: {
    title: "내 프로필",
    description: "내 프로필",
    containLayout: {
      header: true,
      navigation: true,
      footer: false,
    },
  },
  userProfile: {
    title: "유저 프로필",
    description: "유저 프로필",
    containLayout: {
      header: true,
      navigation: true,
      footer: false,
    },
  },
  search: {
    title: "검색",
    description: "검색",
    containLayout: {
      header: true,
      navigation: true,
      footer: false,
    },
  },
  oauth: {
    title: "소셜 로그인",
    description: "소셜 로그인",
    containLayout: {
      header: false,
      navigation: false,
      footer: false,
    },
  },
  notification: {
    title: "알림 조회",
    description: "개인 알림 조회",
    containLayout: {
      header: true,
      navigation: true,
      footer: false,
    },
  },
} satisfies Record<LayoutMetaKey, LayoutMeta>

export const APPLE_SPLASH_SCREENS: AppleImage[] = [
  {
    url: "/splash_screens/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png",
    media:
      "screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png",
    media:
      "screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png",
    media:
      "screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png",
    media:
      "screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png",
    media:
      "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png",
    media:
      "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/iPhone_11__iPhone_XR_landscape.png",
    media:
      "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png",
    media:
      "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png",
    media:
      "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png",
    media:
      "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/13__iPad_Pro_M4_landscape.png",
    media:
      "screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/12.9__iPad_Pro_landscape.png",
    media:
      "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/11__iPad_Pro_M4_landscape.png",
    media:
      "screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png",
    media:
      "screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/10.9__iPad_Air_landscape.png",
    media:
      "screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/10.5__iPad_Air_landscape.png",
    media:
      "screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/10.2__iPad_landscape.png",
    media:
      "screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png",
    media:
      "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/8.3__iPad_Mini_landscape.png",
    media:
      "screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
  },
  {
    url: "/splash_screens/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png",
    media:
      "screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png",
    media:
      "screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",
    media:
      "screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",
    media:
      "screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",
    media:
      "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",
    media:
      "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/iPhone_11__iPhone_XR_portrait.png",
    media:
      "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",
    media:
      "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",
    media:
      "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",
    media:
      "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/13__iPad_Pro_M4_portrait.png",
    media:
      "screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/12.9__iPad_Pro_portrait.png",
    media:
      "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/11__iPad_Pro_M4_portrait.png",
    media:
      "screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png",
    media:
      "screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/10.9__iPad_Air_portrait.png",
    media:
      "screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/10.5__iPad_Air_portrait.png",
    media:
      "screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/10.2__iPad_portrait.png",
    media:
      "screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",
    media:
      "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
  {
    url: "/splash_screens/8.3__iPad_Mini_portrait.png",
    media:
      "screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
  },
]
