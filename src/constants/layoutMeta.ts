export type LayoutMetaKey = "/" | "signup" | "notice" | "chat" | "faq"

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
    title: "개발자 Q&A",
    description: "Q&A",
    containLayout: {
      header: true,
      navigation: true,
      footer: false,
    },
  },
  signup: {
    title: "회원가입",
    description: "회원가입",
    containLayout: {
      header: false,
      navigation: false,
      footer: false,
    },
  },
  chat: {
    title: "커피챗",
    description: "커피챗",
    containLayout: {
      header: true,
      navigation: true,
      footer: false,
    },
  },
  notice: {
    title: "공지사항",
    description: "공지사항",
    containLayout: {
      header: true,
      navigation: true,
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
} satisfies Record<LayoutMetaKey, LayoutMeta>
