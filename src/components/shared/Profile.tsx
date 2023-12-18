import { twMerge } from "tailwind-merge"
import { Icons } from "../icons/Icons"
import Image from "next/image"
import Button from "./button/Button"
import Skeleton from "react-loading-skeleton"
import { useState } from "react"

interface ProfileProps {
  profileImage?: string | null
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Profile({ profileImage, className, onClick }: ProfileProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const classNames = {
    noProfile: twMerge("text-2xl fill-colorsGray", className),
    withProfile: twMerge(
      "relative w-8 h-8 rounded-full overflow-hidden p-0",
      className,
    ),
  }

  if (!profileImage)
    return (
      <Button className="w-8 h-8 p-0">
        <Icons.UserProfile className="text-2xl fill-colorsGray shrink-0" />
      </Button>
    )

  return (
    <Button className={classNames.withProfile} onClick={onClick}>
      <Image
        className="z-[1]"
        src={profileImage}
        alt={"profileImgge"}
        onLoad={() => setImageLoaded(true)}
        fill
        objectFit="cover"
        objectPosition="center"
      />
      {imageLoaded ? null : (
        <Skeleton
          circle
          width={36}
          height={36}
          className="absolute left-0 top-0"
        />
      )}
    </Button>
  )
}

export default Profile
