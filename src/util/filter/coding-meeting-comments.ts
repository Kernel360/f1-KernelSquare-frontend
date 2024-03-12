import { GetCodingMeetingCommentListPayload } from "@/interfaces/dto/coding-meeting/comment/get-coding-meeting-comment-list.dto"
import { cloneDeep } from "lodash-es"

export enum CodingMeetingCommentsFilter {
  "ascending" = "과거순 정렬",
  "descending" = "최신순 정렬",
}

export type CodingMeetingCommentsFilterOption =
  keyof typeof CodingMeetingCommentsFilter
export type CodingMeetingCommentsFilterOptions =
  Array<CodingMeetingCommentsFilterOption>

export const CODING_MEETING_COMMENT_FILTER_KEY = "codingMeetingsComment"

/**
 * `ascending` : 오름차순 (과거순)
 *
 * `descending` : 내림차순 (최신순)
 */
export const codingMeetingCommentsFilter: CodingMeetingCommentsFilterOptions = [
  "ascending",
  "descending",
] as const
export const defaultCodingMeetingCommentsFilter: CodingMeetingCommentsFilterOption =
  "ascending"

export function getCodingMeetingCommentsFilter(): CodingMeetingCommentsFilterOption {
  const codingMeetingCommentFilterStorage = localStorage.getItem(
    CODING_MEETING_COMMENT_FILTER_KEY,
  )

  if (!codingMeetingCommentFilterStorage)
    return defaultCodingMeetingCommentsFilter

  return codingMeetingCommentsFilter.includes(
    codingMeetingCommentFilterStorage as any,
  )
    ? (codingMeetingCommentFilterStorage as CodingMeetingCommentsFilterOption)
    : defaultCodingMeetingCommentsFilter
}

export function setCodingMeetingCommentsFilter(
  filter: CodingMeetingCommentsFilterOption,
) {
  localStorage.setItem(CODING_MEETING_COMMENT_FILTER_KEY, filter)
}

// sort
export function sortCodingMeetingComments({
  comments,
  orderBy,
}: {
  comments: GetCodingMeetingCommentListPayload
  orderBy: CodingMeetingCommentsFilterOption
}) {
  if (!comments?.length) return []

  if (orderBy === "ascending") {
    return comments
  }

  return cloneDeep(comments).reverse()
}
