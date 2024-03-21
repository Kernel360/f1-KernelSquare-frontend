import { getServerSession } from "@/util/auth"
import { EditNicknameRoleError } from "./error/nicknameErrors"
import EditNicknameErrorFallback from "./error/EditNicknameErrorFallback"
import EditNicknameForm from "./form/EditNicknameForm"

function EditNicknamePage() {
  try {
    const { user } = getServerSession()

    if (!user) {
      throw new EditNicknameRoleError({ type: "Unauthorized" })
    }

    return <EditNicknameForm />
  } catch (error) {
    return (
      <EditNicknameErrorFallback
        roleError={error instanceof EditNicknameRoleError}
        error={JSON.stringify(error)}
      />
    )
  }
}

export default EditNicknamePage
