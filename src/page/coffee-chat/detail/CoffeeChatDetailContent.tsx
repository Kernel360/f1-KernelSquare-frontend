"use client"

import { handleViewerLink } from "@/util/editor"
import dynamic from "next/dynamic"

interface CoffeeChatDetailContentProps {
  content: string
}

const MdViewer = dynamic(
  () => import("../../../components/shared/markdown/Viewer/MarkdownViewer"),
  {
    ssr: false,
  },
)

function CoffeeChatDetailContent({ content }: CoffeeChatDetailContentProps) {
  return (
    <div
      className="min-h-[200px] border border-colorsGray rounded-lg p-2"
      onClick={(e) => handleViewerLink("chat")(e)}
    >
      <MdViewer content={content} />
    </div>
  )
}

export default CoffeeChatDetailContent
