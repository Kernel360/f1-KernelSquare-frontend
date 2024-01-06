import { LoginRequest, LoginResponse } from "@/interfaces/dto/auth/login.dto"
import { apiInstance } from "./axios"
import { RouteMap } from "./route-map"
import { AxiosResponse } from "axios"
import {
  DuplicateCheckEmailRequest,
  DuplicateCheckEmailResponse,
} from "@/interfaces/dto/auth/duplicate-check-email.dto"
import {
  DuplicateCheckNickNameRequest,
  DuplicateCheckNickNameResponse,
} from "@/interfaces/dto/auth/duplicate-check-nickname.dto"
import { SignupRequest, SignupResponse } from "@/interfaces/dto/auth/signup.dto"
import { LogoutRequest, LogoutResponse } from "@/interfaces/dto/auth/logout.dto"

export async function login({ email, password }: LoginRequest) {
  const res = await apiInstance.post<
    any,
    AxiosResponse<LoginResponse>,
    LoginRequest
  >(RouteMap.auth.login, {
    email,
    password,
  })

  return res
}

export async function logout({ access_token, refresh_token }: LogoutRequest) {
  const res = apiInstance.post<
    any,
    AxiosResponse<LogoutResponse>,
    LogoutRequest
  >(RouteMap.auth.logout, { access_token, refresh_token })

  return res
}

export async function duplicateCheckEmail({
  email,
}: DuplicateCheckEmailRequest) {
  const res = await apiInstance.post<
    any,
    AxiosResponse<DuplicateCheckEmailResponse>,
    DuplicateCheckEmailRequest
  >(RouteMap.auth.duplicateCheckEmail, {
    email,
  })

  return res
}

export async function duplicateCheckNickname({
  nickname,
}: DuplicateCheckNickNameRequest) {
  const res = await apiInstance.post<
    DuplicateCheckNickNameRequest,
    AxiosResponse<DuplicateCheckNickNameResponse>
  >(RouteMap.auth.duplicateCheckNickname, {
    nickname,
  })

  return res
}

export async function signup({
  email,
  password,
  nickname,
  image_url,
}: SignupRequest) {
  /*
    초기에는 이미지 없이 json으로 body 작성하여
    백엔드에 요청
  */

  /*
    추후 백엔드에서 image 업로드 로직이 구현될 경우
    formdata 형식으로 post 요청 예정
  */

  const res = await apiInstance.post<
    any,
    AxiosResponse<SignupResponse>,
    SignupRequest
  >(RouteMap.auth.signup, {
    email,
    password,
    nickname,
  })

  return res
}
