"use client"

import { twMerge } from "tailwind-merge"

function EditNicknameProgressLoading({ className }: { className?: string }) {
  const classNames = twMerge([
    `border-gray-300 h-20 w-20 animate-spin rounded-full border-2 border-t-blue-600`,
    className,
  ])

  return <div className={classNames} />
}

export default EditNicknameProgressLoading
