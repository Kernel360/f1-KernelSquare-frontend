import { mockDuplicateCheckEmailApi } from "./duplicate-check-email"
import { mockDuplicateCheckNicknameApi } from "./duplicate-check-nickname"
import { mockLoginApi } from "./login"
import { mockLogoutApi } from "./logout"
import { mockSignupApi } from "./signup"

export const mockAuthApi = [
  mockLoginApi,
  mockSignupApi,
  mockDuplicateCheckEmailApi,
  mockDuplicateCheckNicknameApi,
  mockLogoutApi,
]
