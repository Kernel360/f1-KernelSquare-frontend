interface EditNicknameRoleErrorCause {
  type: "Unauthorized"
}

export class EditNicknameRoleError extends Error {
  cause: EditNicknameRoleErrorCause

  constructor(cause: EditNicknameRoleErrorCause) {
    super("EditNicknameRoleError")
    this.cause = { ...cause }
  }
}
