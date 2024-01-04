"use server"

import { cookies } from "next/headers"

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

export async function setAuthCookie(stringifyedPayload: string, exp: number) {
  cookies().set("kernal-auth", stringifyedPayload, {
    path: "/",
    expires: exp * 1000,
  })
}
