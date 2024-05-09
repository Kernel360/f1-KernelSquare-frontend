"use client"

import { useProgressModal } from "@/hooks/useProgressModal"

function ProgressModal() {
  const { ProgressModalView } = useProgressModal()

  return <ProgressModalView />
}

export default ProgressModal
