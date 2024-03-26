"use client"

import ListPage from "@/components/shared/page-template/ListPage"
import { useClientSession } from "@/hooks/useClientSession"
import { getAlertList } from "@/service/sse"
import { useQuery } from "@tanstack/react-query"
import NoContent from "@/components/shared/animation/NoContent"
import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import { useRouter } from "next/navigation"
import NotificationList from "./NotificationList"
import NotificationError from "../error/NotificationError"

function NotificationListContainer() {
  const { user } = useClientSession()

  const {
    data: alertListPayload,
    isPending,
    error,
  } = useQuery({
    queryKey: ["alert", "list", user?.member_id],
    queryFn: () => getAlertList(),
    select(payload) {
      return payload.data.data
    },
  })

  if (isPending) return <ListPage.Loading section="notification" />

  if (error) return <NotificationError error={error} />

  if (!alertListPayload || !alertListPayload.personal_alert_list.length)
    return <NotHasAlert />

  return (
    <>
      <NotificationList alertList={alertListPayload.personal_alert_list} />
    </>
  )
}

export default NotificationListContainer

function NotHasAlert() {
  const { push } = useRouter()

  const goToList = () => {
    push(`/qna?page=0`)
  }

  return (
    <div className="flex flex-1 justify-center items-center box-border p-4 h-[200px]">
      <div className="flex flex-col justify-center items-center">
        <NoContent />
        <h3>알림 내역이 없습니다.</h3>
        <Spacing size={16} />
        <Button buttonTheme="primary" onClick={goToList}>
          개발자 Q&A로 이동
        </Button>
      </div>
    </div>
  )
}
