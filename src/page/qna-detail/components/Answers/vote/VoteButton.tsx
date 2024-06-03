"use client"

import { useClientSession } from "@/hooks/useClientSession"
import { ReturnSyncOrPromise } from "@/interfaces/callback"
import { twJoin } from "tailwind-merge"

interface VoteButtonProps {
  className?: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => ReturnSyncOrPromise
}

function VoteButton({ className, onClick, children }: VoteButtonProps) {
  const { user } = useClientSession()

  const buttonClass = twJoin([
    "align-top text-base pc:text-2xl text-[#E0E0E0] cursor-default",
    `${user ? "hover:text-primary" : "text-slate-300"}`,
  ])

  const classNames = twJoin([buttonClass, className])

  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  )
}

export default VoteButton
