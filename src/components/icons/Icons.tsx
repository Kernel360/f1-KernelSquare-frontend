import { IconBaseProps } from "react-icons"
import { IoSearchOutline } from "react-icons/io5"
import { IoIosNotifications } from "react-icons/io"
import { FaUserCircle } from "react-icons/fa"
import { LuCode2 } from "react-icons/lu"
import { AiOutlineNotification } from "react-icons/ai"
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2"
import { TbMessage2Question } from "react-icons/tb"
import { GrDocumentUser } from "react-icons/gr"
import { BsPencilSquare } from "react-icons/bs"

type IconsKey = "Search" | "Notification" | "UserProfile" | "EditIntro"
type NavigationIconsKey = "QnA" | "Chat" | "Notice" | "FaQ" | "MyPage"
export type Icon = (props: IconBaseProps) => JSX.Element

export const Icons: Record<IconsKey, Icon> = {
  Search(props) {
    return <IoSearchOutline {...props} />
  },
  Notification(props) {
    return <IoIosNotifications {...props} />
  },
  UserProfile(props) {
    return <FaUserCircle {...props} />
  },
  EditIntro(props) {
    return <BsPencilSquare {...props} />
  },
}

export const NavigationIcons: Record<NavigationIconsKey, Icon> = {
  QnA(props) {
    return <LuCode2 {...props} />
  },
  Chat(props) {
    return <HiOutlineChatBubbleLeftRight {...props} />
  },
  Notice(props) {
    return <AiOutlineNotification {...props} />
  },
  FaQ(props) {
    return <TbMessage2Question {...props} />
  },
  MyPage(props) {
    return <GrDocumentUser {...props} />
  },
}
