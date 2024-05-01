import { mockGetUserApi } from "./get-user"
import { mockUpdateUserIntroductionApi } from "./update-introduction"
import { mockUpdateNicknameApi } from "./update-nickname"
import { mockUpdateProfileImageApi } from "./update-profile-image"

export const mockMemberApi = [
  mockGetUserApi,
  mockUpdateUserIntroductionApi,
  mockUpdateProfileImageApi,
  mockUpdateNicknameApi,
]
