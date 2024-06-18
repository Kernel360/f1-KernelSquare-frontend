"use client"

import Button from "@/components/shared/button/Button"
import { useClientSession } from "@/hooks/useClientSession"
import { useEffect, useState } from "react"
import { Icons } from "../icons/Icons"
import { useFCM } from "@/hooks/firebase/useFCM"
import { toast } from "react-toastify"
import { PERMISSION_MESSAGE } from "@/constants/message/permission"
import dayjs from "dayjs"

function NotificationPermissionSnackBar() {
  const { user } = useClientSession()

  const { registerToken, hasFcmToken } = useFCM()

  const [render, setRender] = useState(false)
  const [isGranted, setIsGranted] = useState(false)
  const [isDenied, setIsDenied] = useState(false)

  /**
      - 권한을 승인한 동일 브라우저(디바이스)에서 다른 유저로 로그인 시 토큰을 DB에 저장
      - 동일 디바이스(브라우저)에서 알림 권한을 승인한 경우,
        다른 유저로 로그인해도 다시 권한을 물어보지 않아
        해당 유저에 대한 알림을 푸시 할 수 없어서 구현
  */
  const registerFcmTokenFromSameDevice = async ({
    userId,
  }: {
    userId: number
  }) => {
    hasFcmToken({ userId }).then((userHasFcmToken) => {
      if (userHasFcmToken === "error" || userHasFcmToken) return

      registerToken({ user: { id: userId } })
    })
  }

  const handlePermission = async (permission: NotificationPermission) => {
    setTimeout(() => {
      if (permission === "default") return

      toast.info(
        PERMISSION_MESSAGE[permission] + `(${dayjs().format("YYYY.M.D")})`,
        {
          position: "bottom-center",
        },
      )
    }, 0)

    if (permission === "granted") {
      setIsGranted(true)

      setTimeout(async () => {
        registerToken({
          user: {
            id: user!.member_id,
          },
        })
      }, 0)

      return
    }

    if (permission === "denied") {
      setIsDenied(true)
      return
    }
  }

  useEffect(() => {
    setRender(true)
  }, []) /* eslint-disable-line */

  useEffect(() => {
    if (!user) return
    if (!globalThis?.Notification) return
    if (Notification.permission !== "granted") return

    registerFcmTokenFromSameDevice({ userId: user.member_id })
  }, [user]) /* eslint-disable-line */

  if (!render) return null
  if (!globalThis?.Notification) return null
  if (!user) return null

  if (Notification.permission === "granted" || isGranted) return null
  if (Notification.permission === "denied" || isDenied) {
    return null
  }
  if (Notification.permission === "default") {
    return (
      <Wrapper open={true}>
        <RequestPermissionContent onPermission={handlePermission} />
      </Wrapper>
    )
  }
}

export default NotificationPermissionSnackBar

const Wrapper = ({
  open,
  children,
}: {
  open: boolean
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(open)

  const close = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-[auto_16px_40px] z-[11] animate-in fade-in-0 slide-in-from-bottom-8 duration-700">
      <div className="max-w-[320px] mx-auto flex w-full bg-white rounded-lg p-4 justify-between items-center shadow-md border border-[colorsGray]">
        {children}
        {/* close button */}
        <Button className="group" onClick={close}>
          <Icons.Close className="group-hover:pointerhover:text-primary" />
        </Button>
      </div>
    </div>
  )
}

const RequestPermissionContent = ({
  onPermission,
}: {
  onPermission: (permission: NotificationPermission) => Promise<void>
}) => {
  const requestPermission = () => {
    Notification?.requestPermission(async (permission) => {
      onPermission(permission)
    })
  }

  return (
    <>
      <div className="flex flex-col gap-y-1">
        <div>알림 권한을 허용해주세요</div>
        <div className="text-colorsDarkGray text-xs font-medium">
          사용목적: 푸시 알림 메시지 발송
        </div>
      </div>
      <Button
        className="bg-light-green text-secondary rounded-sm pointerhover:hover:bg-primary pointerhover:hover:text-white"
        onClick={requestPermission}
      >
        권한 설정
      </Button>
    </>
  )
}
