import { CircleIcons, Icons } from "@/components/icons/Icons"
import { CoffeeChatReservationTime } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import { getTime } from "@/util/getDate"
import Image from "next/image"
import EnterCoffeeChatButton from "../../../EnterCoffeeChat/EnterCoffeeChatButton"

interface ReservedTimeProps {
  chatTitle: string
  reservation_id: number
  time: CoffeeChatReservationTime
}

function ReservedTime({ chatTitle, reservation_id, time }: ReservedTimeProps) {
  return (
    <div
      className={
        "p-1 flex gap-1 w-full border-b border-colorsGray pointerhover:hover:bg-info pointerhover:hover:cursor-pointer"
      }
    >
      <div>
        <Time timeFormat={time.start_time} fill={!!time.mentee_nickname} />
      </div>
      <div className="flex-1">
        {time.mentee_nickname ? (
          <>
            <ReservedMember
              nickname={time.mentee_nickname}
              profileImage={time.mentee_image_url}
            />
            <div>
              <EnterCoffeeChatButton
                articleTitle={chatTitle}
                roomId={time.room_id}
                startTime={time.start_time}
                reservation_id={reservation_id}
                className="w-full h-fit px-2 py-1 shrink-0 font-semibold text-sm bg-primary text-white"
              />
            </div>
          </>
        ) : (
          <NotHasReservedMember />
        )}
      </div>
    </div>
  )
}

export default ReservedTime

const NotHasReservedMember = () => {
  return (
    <div className="text-colorsDarkGray text-sm">예약된 일정이 없습니다.</div>
  )
}

const ReservedMember = ({
  nickname,
  profileImage,
}: {
  nickname: string
  profileImage: string | null
}) => {
  return (
    <div>
      <UserProfile nickname={nickname} profileImage={profileImage} />
      <span className="ml-1 text-sm whitespace-pre-line">
        <span className="font-bold">{nickname}</span>
        {` 님 과(와)의\n커피 챗이 예정되어 있습니다.`}
      </span>
    </div>
  )
}

const Time = ({ timeFormat, fill }: { timeFormat: string; fill?: boolean }) => {
  return (
    <div className="flex items-center gap-1">
      {fill ? (
        <CircleIcons.Fill className="text-[8px] text-primary shrink-0" />
      ) : (
        <CircleIcons.Line className="text-[8px] shrink-0" />
      )}
      <time className={`text-sm shrink-0`}>{getTime(timeFormat)}</time>
    </div>
  )
}

const UserProfile = ({
  nickname,
  profileImage,
}: {
  nickname: string | null
  profileImage: string | null
}) => {
  if (!nickname) return null

  if (!profileImage) {
    return (
      <Icons.UserProfile className="inline-flex align-top text-2xl text-colorsGray shrink-0" />
    )
  }

  return (
    <div className="inline-flex align-top relative w-6 h-6 rounded-full overflow-hidden">
      <Image
        src={profileImage}
        alt=""
        fill
        sizes="auto"
        className="object-cover"
      />
    </div>
  )
}
