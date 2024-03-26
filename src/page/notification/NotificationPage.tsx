import ListPage from "@/components/shared/page-template/ListPage"
import NotificationListContainer from "./list/NotificationListContainer"

function NotificationPage() {
  return (
    <ListPage section="notification">
      <NotificationListContainer />
    </ListPage>
  )
}

export default NotificationPage
