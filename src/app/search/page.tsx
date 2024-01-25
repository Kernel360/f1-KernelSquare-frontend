import { layoutMeta } from "@/constants/layoutMeta"
import Search from "@/page/search/Search"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `${layoutMeta["search"].title}`,
  description: `${layoutMeta["search"].description}`,
}

export default function SearchPage() {
  return <Search />
}
