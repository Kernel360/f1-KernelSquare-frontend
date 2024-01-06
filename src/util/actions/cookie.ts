"use server"

import {
  ACCESS_TOKEN_KEY,
  ENCRYPTED_PAYLOAD_KEY,
  REFRESH_TOKEN_KEY,
} from "@/constants/token"
import { cookies } from "next/headers"

// next/headers cookies 서버 액션 함수

export async function getCookie(name: string) {
  return cookies().get(name)
}

export async function getAllCookies() {
  return cookies().getAll()
}

export async function setCookie(key: string, value: string) {
  return cookies().set(key, value)
}

export async function deleteCookie(key: string) {
  return cookies().delete(key)
}

// auth cookie util

export async function getPayloadCookie() {
  const payloadCookie = cookies().get(ENCRYPTED_PAYLOAD_KEY)

  return payloadCookie ? payloadCookie.value : null
}

export async function getAuthCookie() {
  try {
    const [accessToken, refreshToken] = await Promise.all([
      cookies().get(ACCESS_TOKEN_KEY),
      cookies().get(REFRESH_TOKEN_KEY),
    ])

    return {
      accessToken: accessToken?.value,
      refreshToken: refreshToken?.value,
    }
  } catch (error) {
    return { accessToken: undefined, refreshToken: undefined }
  }
}

export async function setAuthCookie(
  accessToken: string,
  refreshToken: string,
  encryptedPayload: string,
) {
  cookies().set(ACCESS_TOKEN_KEY, accessToken, {
    path: "/",
    maxAge: 60 * 60,
    httpOnly: true,
  })
  cookies().set(ENCRYPTED_PAYLOAD_KEY, encryptedPayload, {
    path: "/",
    maxAge: 60 * 60,
  })

  cookies().set(REFRESH_TOKEN_KEY, refreshToken, {
    maxAge: 60 * 60 * 24 * 14,
    httpOnly: true,
  })
}

export async function deleteAuthCookie() {
  cookies().delete({
    name: ACCESS_TOKEN_KEY,
    path: "/",
    maxAge: 60 * 60,
    httpOnly: true,
  })

  cookies().delete({
    name: REFRESH_TOKEN_KEY,
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
    httpOnly: true,
  })

  cookies().delete(ENCRYPTED_PAYLOAD_KEY)
}
