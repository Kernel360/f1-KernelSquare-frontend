"use client"

import { useClientSession } from "@/hooks/useClientSession"

interface PageInfoAreaProps {
  className?: string
  children: React.ReactNode
}

interface PageInfoAreaCaseProps {
  children: React.ReactNode
}

function PageInfoArea({ className, children }: PageInfoAreaProps) {
  return <div className={className}>{children}</div>
}

export default PageInfoArea

PageInfoArea.NotLoginedUserArea = function PageInfoNotLoginedUserArea({
  children,
}: PageInfoAreaCaseProps) {
  const { user } = useClientSession()

  return !user ? <>{children}</> : null
}

PageInfoArea.LoginedUserArea = function PageInfoLoginedUserArea({
  children,
}: PageInfoAreaCaseProps) {
  const { user } = useClientSession()

  return user ? <>{children}</> : null
}
