import { IconBaseProps } from "react-icons"
import { IoSearchOutline } from "react-icons/io5"
import { IoIosNotifications } from "react-icons/io"
import { FaCircle, FaRegCircle, FaUserCircle } from "react-icons/fa"
import { LuCode2, LuInfo, LuSearchCode } from "react-icons/lu"
import { AiOutlineNotification } from "react-icons/ai"
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2"
import { TbMessage2Question } from "react-icons/tb"
import { GrDocumentUser } from "react-icons/gr"
import { BsPencilSquare } from "react-icons/bs"
import {
  BiSolidLeftArrow,
  BiSolidRightArrow,
  BiSolidUpArrow,
} from "react-icons/bi"
import { BiSolidDownArrow } from "react-icons/bi"
import { TbPencilPlus } from "react-icons/tb"
import { RiArrowUpSLine } from "react-icons/ri"
import { MdClose } from "react-icons/md"
import { MdComputer } from "react-icons/md"

type IconsKey =
  | "Search"
  | "Notification"
  | "UserProfile"
  | "EditIntro"
  | "PostQuestion"
  | "ScrollToTop"
  | "Search"
  | "Close"
  | "Info"
type NavigationIconsKey =
  | "QnA"
  | "Chat"
  | "CodingMeetings"
  | "Notice"
  | "FaQ"
  | "MyPage"
type DirectionIconsKey = "Up" | "Down" | "Left" | "Right"
type CircleIconsKey = "Line" | "Fill"
export type Icon = (props: IconBaseProps) => JSX.Element

export const Icons: Record<IconsKey, Icon> = {
  // Search(props) {
  //   return <IoSearchOutline {...props} />
  // },
  Notification(props) {
    return <IoIosNotifications {...props} />
  },
  UserProfile(props) {
    return <FaUserCircle {...props} />
  },
  EditIntro(props) {
    return <BsPencilSquare {...props} />
  },
  PostQuestion(props) {
    return <TbPencilPlus {...props} />
  },
  ScrollToTop(props) {
    return <RiArrowUpSLine {...props} />
  },
  Search(props) {
    return <LuSearchCode {...props} />
  },
  Close(props) {
    return <MdClose {...props} />
  },
  Info(props) {
    return <LuInfo {...props} />
  },
}

export const NavigationIcons: Record<NavigationIconsKey, Icon> = {
  QnA(props) {
    return <LuCode2 {...props} />
  },
  Chat(props) {
    return <HiOutlineChatBubbleLeftRight {...props} />
  },
  CodingMeetings(props) {
    return <MdComputer {...props} />
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

export const DirectionIcons: Record<DirectionIconsKey, Icon> = {
  Up(props) {
    return <BiSolidUpArrow {...props} />
  },
  Down(props) {
    return <BiSolidDownArrow {...props} />
  },
  Left(props) {
    return <BiSolidLeftArrow {...props} />
  },
  Right(props) {
    return <BiSolidRightArrow {...props} />
  },
}

export const CircleIcons: Record<CircleIconsKey, Icon> = {
  Line(props) {
    return <FaRegCircle {...props} />
  },
  Fill(props) {
    return <FaCircle {...props} />
  },
}
