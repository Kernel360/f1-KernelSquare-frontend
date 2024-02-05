"use client"

import { USER_LOCAL_STORAGE_KEY } from "@/constants/editor"
import { userAtom, userClientSession } from "@/recoil/atoms/user"
import { deleteAuthCookie } from "@/util/actions/cookie"
import { useCallback } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil"

export function useClientSession() {
  const user = useRecoilValue(userAtom)
  const setUser = useSetRecoilState(userAtom)

  const { clientSessionUpdate, clientSessionReset } =
    useRecoilValue(userClientSession)

  const clientSessionLogout = useCallback(async () => {
    await deleteAuthCookie()

    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
    }

    setUser(null)
  }, [setUser])

  return {
    user,
    clientSessionLogout,
    clientSessionUpdate,
    clientSessionReset,
  }
}
