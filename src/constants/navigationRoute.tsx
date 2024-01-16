import { NavigationIcons } from "@/components/icons/Icons"
import { NOTMATCH_SEGMENT } from "./layoutMeta"

export const enum NavigationRouteIndex {
  Qna = 0,
  Chat = 1,
  Notice = 2,
  Faq = 3,
}

export const enum ProfileRouteIndex {
  Mypage = 0,
}

export const navigationRoutes = [
  {
    label: "개발자 Q&A",
    icon: NavigationIcons.QnA,
    to: "/",
    activeClassName: "text-primary",
  },
  {
    label: "커피챗",
    icon: NavigationIcons.Chat,
    to: "/chat",
    activeClassName: "text-amber-600",
  },
  {
    label: "공지",
    icon: NavigationIcons.Notice,
    to: "/notice",
    activeClassName: "text-orange-400",
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
    // QnA 리스트
    if (pathname === "/") return navigationRoutes[NavigationRouteIndex.Qna]

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

  // Profile Path (/profile/**)
  if (segment === "profile") {
    if (pathname === "/profile") return profileRoute[ProfileRouteIndex.Mypage]

    return null
  }

  // Notice Path (/notice/**)
  if (segment === "notice") {
    return navigationRoutes[NavigationRouteIndex.Notice]
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
