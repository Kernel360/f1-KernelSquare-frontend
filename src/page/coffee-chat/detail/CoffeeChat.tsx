import { CoffeeChatReservationDetailPayload } from "@/interfaces/dto/coffee-chat/coffeechat-reservation-detail.dto"
import CoffeeChatTitle from "./section/CoffeeChatTitle"
import CoffeeChatAuthor from "./section/author/CoffeeChatAuthor"
import CoffeeChatDetailContent from "./CoffeeChatDetailContent"
import { UserProfileInfo } from "@/components/shared/user/UserInfo"
import CoffeeChatHashTags from "./section/CoffeeChatHashTags"

interface CoffeeChatProps {
  coffeeChat: CoffeeChatReservationDetailPayload
}

function CoffeeChat({ coffeeChat }: CoffeeChatProps) {
  const coffeeChatAuthor: UserProfileInfo = {
    id: coffeeChat.member_id,
    nickname: coffeeChat.nickname,
    level: coffeeChat.level,
    levelImageUrl: coffeeChat.level_image_url,
    profileImageUrl: coffeeChat.member_image_url,
  }

  return (
    <div>
      <div className="pb-4 border-b border-b-[#E0E0E0]">
        <CoffeeChatTitle title={coffeeChat.title} />
        <CoffeeChatAuthor
          author={coffeeChatAuthor}
          articleId={coffeeChat.article_id}
          createdAt={coffeeChat.created_date}
        />
      </div>
      <div className="mb-6">
        <CoffeeChatDetailContent content={coffeeChat.content} />
      </div>
      <CoffeeChatHashTags hashTags={coffeeChat.hashtags} />
    </div>
  )
}

export default CoffeeChat
