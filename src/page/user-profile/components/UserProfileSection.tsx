import Spacing from "@/components/shared/Spacing"
import { CSSProperties } from "react"
import { twMerge } from "tailwind-merge"

interface UserProfileSectionProps {
  title?: React.ReactNode
  className?: string
  style?: CSSProperties
  children: React.ReactNode
}

function UserProfileSection({
  title,
  className,
  style,
  children,
}: UserProfileSectionProps) {
  const classNames = twMerge([
    "box-border border border-colorsGray p-2 rounded-lg shadow-sm",
    className,
  ])

  const Title = () => {
    if (!title) return null

    if (typeof title === "string") {
      return (
        <h3 className="text-xl font-bold text-primary">
          {title}
          <Spacing size={12} />
        </h3>
      )
    }

    return (
      <>
        {title}
        <Spacing size={12} />
      </>
    )
  }

  return (
    <section className={classNames} style={style}>
      <Title />
      <article>{children}</article>
    </section>
  )
}

export default UserProfileSection
