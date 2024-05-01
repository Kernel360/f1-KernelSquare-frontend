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
      currentPath: globalThis.location.href,
    }

    globalThis.sessionStorage.setItem(
      HISTORY_SESSION_PATH_KEY,
      JSON.stringify(session),
    )

    return
  }

  const correctPath = (currentPath: string) => {
    const baseURL = process.env.NEXT_PUBLIC_SITE_URL

    if (currentPath === `${baseURL}/qna`) return "/qna?page=0"
    if (currentPath === `${baseURL}/chat`) return "/chat?page=0"
    if (currentPath === `${baseURL}/coding-meetings`)
      return "/coding-meetings?page=0&size=10&filter=all"

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
