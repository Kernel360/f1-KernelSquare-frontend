import { layoutMeta } from "@/constants/layoutMeta"
import Chat from "@/page/Chat"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `${layoutMeta["chat"].title}`,
  description: `${layoutMeta["chat"].description}`,
}

export default function ChatPage() {
  return <Chat />
}
