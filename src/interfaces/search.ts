export type SearchFilter = "nickname" | "title" | "tag"

export interface SearchState {
  value: string
  filter: SearchFilter
}
