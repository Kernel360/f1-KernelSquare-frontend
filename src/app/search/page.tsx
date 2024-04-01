import { layoutMeta } from "@/constants/layoutMeta"
import Search from "@/page/search/Search"
import { Metadata } from "next"

interface SearchPageProps {
  searchParams: {
    keyword?: string
    page?: string
  }
}

export function generateMetadata({ searchParams }: SearchPageProps): Metadata {
  const keyword = searchParams.keyword ?? ""

  const title = keyword ? `${keyword} 검색 결과` : "검색 결과"
  const description = keyword
    ? `${keyword} 검색 결과를 확인 해보세요`
    : "검색 결과를 확인해 보세요"

  return {
    title,
    description,
    openGraph: {
      title: `${title} - 커널스퀘어`,
      description,
      images: {
        url: "/og.png",
        alt: "Kernel Square",
      },
    },
    twitter: {
      title: `${title} - 커널스퀘어`,
      description,
      images: {
        url: "/og.png",
        alt: "Kernel Square",
      },
    },
  }
}

export default function SearchPage() {
  return <Search />
}
