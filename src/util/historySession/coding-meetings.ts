import { CodingMeetingListFilter } from "@/interfaces/dto/coding-meeting/get-coding-meetingl-list.dto"

type SearchParamValue = string | null

interface CodingMeetingsHistorySession {
  page: number
  size: number
  filter: CodingMeetingListFilter
}

export const CODING_MEETINGS_HISTORY_SESSION_KEY = "codingMeetingsHistory"

export function getCodingMeetingsTargetHistory() {
  const { page, size, filter } = getCodingMeetingsHistorySession()

  return {
    page: `${page}`,
    size: `${size}`,
    filter,
  }
}

export function getCodingMeetingsHistorySession(): CodingMeetingsHistorySession {
  const codingMeetingsHistorySession = sessionStorage.getItem(
    CODING_MEETINGS_HISTORY_SESSION_KEY,
  )

  const session = codingMeetingsHistorySession
    ? JSON.parse(codingMeetingsHistorySession)
    : null

  return {
    page:
      session && typeof session === "object" && "page" in session
        ? session.page
        : 0,
    size: 10,
    filter:
      session && typeof session === "object" && "filter" in session
        ? session.filter
        : "all",
  }
}

export function setCodingMeetingsHistorySession({
  page,
  size,
  filter,
}: Record<keyof CodingMeetingsHistorySession, SearchParamValue> & {
  filter: CodingMeetingListFilter | null
}) {
  sessionStorage.setItem(
    CODING_MEETINGS_HISTORY_SESSION_KEY,
    JSON.stringify({
      page,
      size: 10,
      filter,
    }),
  )
}
