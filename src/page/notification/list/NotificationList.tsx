"use client"

import { AlermList } from "@/components/layout/header/alerm/Alerm"
import { GetAlertListPayload } from "@/interfaces/dto/sse/get-alret-list"

interface NotificationListProps {
  alertList: GetAlertListPayload["personal_alert_list"]
}

function NotificationList({ alertList }: NotificationListProps) {
  return (
    <div className="w-full mx-auto">
      <ul className="flex flex-col gap-4">
        {alertList
          .map((alerm) => (
            <li
              key={alerm.id}
              className="border border-colorsGray rounded-lg overflow-hidden"
            >
              <AlermList.Alerm alerm={alerm} />
            </li>
          ))
          .reverse()}
      </ul>
    </div>
  )
}

export default NotificationList
