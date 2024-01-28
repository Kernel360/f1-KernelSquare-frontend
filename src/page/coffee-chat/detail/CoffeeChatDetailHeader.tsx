import Profile from "@/components/shared/Profile"
import Spacing from "@/components/shared/Spacing"
import HashTag from "@/components/shared/tag/HashTag"
import Image from "next/image"
import type { CoffeeChatReservationDetailPayload } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"

interface CoffeeChatDetailHeaderProps
  extends Pick<
    CoffeeChatReservationDetailPayload,
    | "title"
    | "nickname"
    | "member_image_url"
    | "level"
    | "level_image_url"
    | "hashtags"
  > {}

function CoffeeChatDetailHeader({
  title,
  nickname,
  member_image_url,
  level,
  level_image_url,
  hashtags,
}: CoffeeChatDetailHeaderProps) {
  return (
    <section>
      <div className="flex gap-1 items-center">
        <div className="flex-1">
          <h3>{title}</h3>
          <Spacing size={12} />
          <ul className="w-full flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <li key={`hash-${tag.hashtag_id}`}>
                <HashTag>{tag.content}</HashTag>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-1 items-center">
          <Profile className="w-10 h-10" profileImage={member_image_url} />
          <div>
            <span className="text-sm font-bold">{nickname}</span>
            <div className="flex items-center">
              <div className="relative w-4 h-4 flex justify-center items-center">
                <Image
                  src={level_image_url}
                  alt={`level badge`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span className="text-xs">Lv.{level}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoffeeChatDetailHeader
