import { getCoffeeChatReservationList } from "@/service/coffee-chat"

export async function getIntroduction({ articleId }: { articleId: number }) {
  let result = null

  let page = 0
  let isEndPage = false

  while (!isEndPage) {
    const { data } = await getChatPagination({ page })

    if (!data?.data) break

    const targetCoffeeChat = data.data.list.find(
      (coffeeChat) => coffeeChat.article_id === articleId,
    )
    if (targetCoffeeChat) {
      result = targetCoffeeChat.introduction
      break
    }

    page += 1
    isEndPage = data.data.pagination.is_end
  }

  return result
}

async function getChatPagination({ page }: { page: number }) {
  const res = await getCoffeeChatReservationList({ page })

  return res
}
