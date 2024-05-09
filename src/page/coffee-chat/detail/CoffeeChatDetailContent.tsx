"use client"

import { handleViewerLink } from "@/util/editor"
import dynamic from "next/dynamic"

interface CoffeeChatDetailContentProps {
  content: string
}

const CoffeeChatContentMdViewer = dynamic(
  () => import("../../../components/shared/markdown/Viewer/MarkdownViewer"),
  {
    ssr: false,
    loading(loadingProps) {
      return <div className="skeleton h-[200px] rounded-lg mt-2.5" />
    },
  },
)

function CoffeeChatDetailContent({ content }: CoffeeChatDetailContentProps) {
  return (
    <div className="" onClick={handleViewerLink("chat")}>
      <CoffeeChatContentMdViewer content={content} />
    </div>
  )
}

export default CoffeeChatDetailContent
