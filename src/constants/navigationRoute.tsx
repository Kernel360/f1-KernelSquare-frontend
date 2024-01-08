import { NavigationIcons } from "@/components/icons/Icons"

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
  {
    label: "마이 페이지",
    icon: NavigationIcons.MyPage,
    to: "/profile",
    activeClassName: "text-purple-500",
  },
]
