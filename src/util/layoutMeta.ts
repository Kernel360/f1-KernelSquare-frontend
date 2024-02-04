import { LayoutMeta, layoutMeta } from "@/constants/layoutMeta"
import { ReadonlyURLSearchParams } from "next/navigation"

interface LayoutMetaIndexSignature {
  [key: string]: LayoutMeta
}

export function matchSegmentToLayoutMetaKey(
  currentSegment: string | null,
  pathname?: string,
  searchParams?: ReadonlyURLSearchParams,
) {
  if (currentSegment === "chat") {
    const popup = searchParams?.get("popup")
    if (popup && popup === "true") {
      return layoutMeta["chat/popup"]
    }
  }

  return (layoutMeta as LayoutMetaIndexSignature)[currentSegment ?? "/"]
}
