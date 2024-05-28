import { TargetPage } from "@/components/LinkToListPage"

export interface HistorySessionPath {
  prevPath: string | null
  currentPath: string
}

export const HISTORY_SESSION_PATH_KEY = "kernelSquarePath"

export function getHistorySessionPath() {
  const sessionStorage = globalThis?.sessionStorage

  if (!sessionStorage) return null

  const path = sessionStorage.getItem(HISTORY_SESSION_PATH_KEY)

  if (!path) return null

  try {
    return JSON.parse(path) as HistorySessionPath
  } catch (error) {
    return null
  }
}

export function updateHistorySessionPath() {
  const path = getHistorySessionPath()

  if (!path) {
    const session: HistorySessionPath = {
      prevPath: null,
      currentPath: new URL(
        globalThis.location.href,
        process.env.NEXT_PUBLIC_SITE_URL,
      ).href,
    }

    globalThis.sessionStorage.setItem(
      HISTORY_SESSION_PATH_KEY,
      JSON.stringify(session),
    )

    return
  }

  const correctPath = (currentPath: string) => {
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL

    let rewritedPath = null
    if (currentPath === `${baseURL}/qna`) rewritedPath = "/qna?page=0"
    if (currentPath === `${baseURL}/chat`) rewritedPath = "/chat?page=0"
    if (currentPath === `${baseURL}/coding-meetings`)
      rewritedPath = "/coding-meetings?page=0&size=10&filter=all"

    if (rewritedPath) {
      return new URL(rewritedPath, process.env.NEXT_PUBLIC_SITE_URL).href
    }

    return globalThis.location.href
  }

  const session: HistorySessionPath = {
    prevPath:
      path.currentPath === globalThis.location.href
        ? path.prevPath
        : path.currentPath,
    currentPath: correctPath(globalThis.location.href),
  }

  globalThis.sessionStorage.setItem(
    HISTORY_SESSION_PATH_KEY,
    JSON.stringify(session),
  )
}

//
export function pathnameOfBack(pathname: string): TargetPage | null {
  if (isQuestionEditPage(pathname)) return "qna"
  if (isQuestionDetailPage(pathname)) return "qna"
  if (isCoffeeChatDetailPage(pathname)) return "chat"
  if (pathname === "/chat/create") return "chat"
  if (
    pathname !== "/coding-meetings" &&
    pathname.startsWith("/coding-meetings")
  )
    return "coding-meetings"

  return null
}

export function isQuestionEditPage(pathname: string) {
  return pathname === "/question" || pathname.startsWith("/question/u/")
}

export function isQuestionDetailPage(pathname: string) {
  return /^\/question\/[0-9]+$/g.test(pathname)
}

export function isCoffeeChatDetailPage(pathname: string) {
  return /^\/chat\/[0-9]+$/g.test(pathname)
}
