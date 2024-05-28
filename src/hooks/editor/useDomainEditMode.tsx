"use client"

import { usePathname } from "next/navigation"

type Mode = "create" | "update" | "none"

export function useDomainEditMode() {
  const pathname = usePathname()

  if (pathname.startsWith("/question")) {
    if (pathname === "/question") return "create"
    if (pathname.startsWith("/question/u/")) return "update"

    return "none"
  }

  if (pathname.startsWith("/chat")) {
    if (pathname === "/chat/create") return "create"
    if (pathname.startsWith("/chat/u/")) return "update"

    return "none"
  }

  if (pathname.startsWith("/coding-meetings")) {
    if (pathname === "/coding-meetings/create") return "create"
    if (pathname.startsWith("/coding-meetings/post/")) return "update"

    return "none"
  }

  return "none"
}
