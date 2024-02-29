import { NavigationIcons } from "@/components/icons/Icons"
import { NOTMATCH_SEGMENT } from "./layoutMeta"

export const enum NavigationRouteIndex {
  Qna = 0,
  Chat = 1,
  CodingMeetings = 2,
  Faq = 3,
}

export const enum ProfileRouteIndex {
  Mypage = 0,
}

export const navigationRoutes = [
  {
    label: "개발자 Q&A",
    icon: NavigationIcons.QnA,
    to: "/qna?page=0",
    activeClassName: "text-primary",
  },
  {
    label: "커피챗",
    icon: NavigationIcons.Chat,
    to: "/chat",
    activeClassName: "text-amber-600",
  },
  {
    label: "모각코",
    icon: NavigationIcons.CodingMeetings,
    to: "/coding-meetings",
    activeClassName: "text-secondary",
  },
  {
    label: "FAQ",
    icon: NavigationIcons.FaQ,
    to: "/faq",
    activeClassName: "text-blue-400",
  },
]

export const profileRoute = [
  {
    label: "마이 페이지",
    icon: NavigationIcons.MyPage,
    to: "/profile",
    activeClassName: "text-purple-500",
  },
]

export function getActiveNavigationItem({
  segment,
  pathname,
}: {
  segment: string | null
  pathname: string
}) {
  // NotFound Page
  if (segment === NOTMATCH_SEGMENT) return null

  // RootPath(/)
  if (segment === null) {
    return null
  }

  // Qna Path(/qna/**)
  if (segment === "qna") {
    if (pathname === "/qna") return navigationRoutes[NavigationRouteIndex.Qna]

    return null
  }

  // Question Path (/question/**)
  if (segment === "question") {
    // 질문 수정
    if (pathname.startsWith("/question/u/")) return null
    // 질문 상세
    if (pathname.startsWith("/question/"))
      return navigationRoutes[NavigationRouteIndex.Qna]

    return null
  }

  if (segment === "coding-meetings") {
    return navigationRoutes[NavigationRouteIndex.CodingMeetings]
  }

  // Profile Path (/profile/**)
  if (segment === "profile") {
    if (pathname.startsWith("/profile"))
      return profileRoute[ProfileRouteIndex.Mypage]

    return null
  }

  // Faq Path (/faq/**)
  if (segment === "faq") {
    return navigationRoutes[NavigationRouteIndex.Faq]
  }

  // coffeeChat Path(/chat/**)
  if (segment === "chat") {
    return navigationRoutes[NavigationRouteIndex.Chat]
  }

  return null
}
