import { twMerge } from "tailwind-merge"
import { Icons } from "../icons/Icons"
import Image from "next/image"
import Button from "./button/Button"
import Skeleton from "react-loading-skeleton"
import { ButtonHTMLAttributes, useState } from "react"

interface ProfileProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  profileImage?: string | null
  className?: string
}

function Profile({ profileImage, className, ...props }: ProfileProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const classNames = {
    noProfile: twMerge("w-8 h-8 p-0", className),
    withProfile: twMerge(
      "relative w-8 h-8 rounded-full overflow-hidden p-0",
      className,
    ),
  }

  if (!profileImage)
    return (
      <Button className={classNames.noProfile} {...props}>
        <Icons.UserProfile className="text-[30px] leading-8 fill-colorsGray shrink-0" />
      </Button>
    )

  return (
    <Button className={classNames.withProfile} {...props}>
      <Image
        className="z-[1]"
        src={profileImage}
        alt={"profileImgge"}
        onLoad={() => setImageLoaded(true)}
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
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
