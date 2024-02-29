"use client"

import { twMerge } from "tailwind-merge"

function DetailSection({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: React.ReactNode
}) {
  const classNames = twMerge([`w-full flex`, className])

  return (
    <section className={classNames}>
      <div className="w-[70px] shrink-0">
        <DetailSection.Title title={title} />
      </div>
      <div>{children}</div>
    </section>
  )
}

export default DetailSection

DetailSection.Title = function DetailSectionTitle({
  title,
}: {
  title: string
}) {
  return <h4 className="text-[#828282]">{title}</h4>
}
