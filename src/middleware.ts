import { cookies } from "next/headers"
import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import {
  ACCESS_TOKEN_KEY,
  CustomAuthorizedHeaderName,
  CustomAuthorizedHeaderValue,
} from "./constants/token"

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const requestHeaders = new Headers(request.headers)
  const url = request.nextUrl

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  if (url.pathname === "/signup") {
    if (cookies().get(ACCESS_TOKEN_KEY)) {
      setCustomAuthorizedHeader(response.headers, "authorized")

      return response
    }

    setCustomAuthorizedHeader(response.headers, "unauthorized")

    return response
  }

  if (url.pathname === "/question") {
    if (!cookies().get(ACCESS_TOKEN_KEY)) {
      setCustomAuthorizedHeader(response.headers, "unauthorized")

      return response
    }

    setCustomAuthorizedHeader(response.headers, "authorized")

    return response
  }

  if (url.pathname === "/profile") {
    if (!cookies().get(ACCESS_TOKEN_KEY)) {
      setCustomAuthorizedHeader(response.headers, "unauthorized")

      return response
    }

    setCustomAuthorizedHeader(response.headers, "authorized")

    return response
  }

  return response
}

export const config = {
  matcher: ["/signup", "/question", "/profile"],
}

function setCustomAuthorizedHeader(
  responseHeader: Headers,
  value: "authorized" | "unauthorized",
) {
  const headerValue =
    value === "authorized"
      ? CustomAuthorizedHeaderValue.Authorized
      : CustomAuthorizedHeaderValue.UnAuthorized

  responseHeader.set(CustomAuthorizedHeaderName, headerValue)
}
