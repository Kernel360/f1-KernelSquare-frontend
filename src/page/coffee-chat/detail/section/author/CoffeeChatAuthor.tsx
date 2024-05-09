import UserInfo, { UserProfileInfo } from "@/components/shared/user/UserInfo"
import CoffeeChatAuthorMenu from "./CoffeeChatAuthorMenu"
import CoffeeChatCreatedTime from "./CoffeeChatCreatedTime"

interface CoffeeChatAuthorProps {
  author: UserProfileInfo
  articleId: number
  createdAt: string
}

function CoffeeChatAuthor({
  author,
  articleId,
  createdAt,
}: CoffeeChatAuthorProps) {
  return (
    <section className="flex w-full justify-between gap-3">
      <section className="flex gap-4 items-center">
        <UserInfo user={author} />
        <CoffeeChatCreatedTime createdAt={createdAt} />
      </section>
      <CoffeeChatAuthorMenu author={author} articleId={articleId} />
    </section>
  )
}

export default CoffeeChatAuthor
