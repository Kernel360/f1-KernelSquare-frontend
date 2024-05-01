import { Icons, NavigationIcons } from "@/components/icons/Icons"
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

export const enum RequiredAuthIndex {
  MyPage = 0,
  Notification = 1,
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
    to: "/chat?page=0",
    activeClassName: "text-amber-600",
  },
  {
    label: "모각코",
    icon: NavigationIcons.CodingMeetings,
    to: "/coding-meetings?page=0&size=10&filter=all",
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

export const requiredAuthRoute = [
  {
    label: "마이 페이지",
    icon: NavigationIcons.MyPage,
    to: "/profile",
    activeClassName: "text-purple-500",
  },
  {
    label: "알림",
    icon: Icons.Notification,
    to: "/notification",
    activeClassName: "text-[#FFA500]",
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

  // notification Path(/notification)
  if (segment === "notification") {
    return requiredAuthRoute[RequiredAuthIndex.Notification]
  }

  return null
}
