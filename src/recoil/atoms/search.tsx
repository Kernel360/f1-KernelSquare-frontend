import { SearchState } from "@/interfaces/search"
import { atom } from "recoil"

export const searchState = atom<SearchState>({
  key: "search-atom",
  default: {
    searchKeyword: "",
  },
})
