import Profile from "@/components/shared/Profile"
import { useClientSession } from "@/hooks/useClientSession"

function DeleteMemberModalHeader() {
  const { user } = useClientSession()

  return (
    <div>
      <Profile profileImage={user?.image_url} />
    </div>
  )
}

export default DeleteMemberModalHeader
