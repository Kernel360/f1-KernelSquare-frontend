"use client"

import dynamic from "next/dynamic"

interface CoffeeChatDetailContentProps {
  content: string
}

const CoffeeChatContentMdViewer = dynamic(
  () => import("@/components/shared/toast-ui-editor/viewer/ContentViewer"),
  {
    ssr: false,
    loading(loadingProps) {
      return <div className="skeleton h-[200px] rounded-lg mt-2.5" />
    },
  },
)

function CoffeeChatDetailContent({ content }: CoffeeChatDetailContentProps) {
  return (
    <div>
      <CoffeeChatContentMdViewer domain="chat" content={content} />
    </div>
  )
}

export default CoffeeChatDetailContent
