import { LayoutMeta, layoutMeta } from "@/constants/layoutMeta"

interface LayoutMetaIndexSignature {
  [key: string]: LayoutMeta
}

export function matchSegmentToLayoutMetaKey(currentSegment: string | null) {
  return (layoutMeta as LayoutMetaIndexSignature)[currentSegment ?? "/"]
}
