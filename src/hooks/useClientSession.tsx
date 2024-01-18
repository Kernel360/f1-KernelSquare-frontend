"use client"

import { userAtom, userClientSession } from "@/recoil/atoms/user"
import { useRecoilValue } from "recoil"

export function useClientSession() {
  const user = useRecoilValue(userAtom)
  const {
    clientSessionLogin,
    clientSessionLogout,
    clientSessionUpdate,
    clientSessionReset,
  } = useRecoilValue(userClientSession)

  return {
    user,
    clientSessionLogin,
    clientSessionLogout,
    clientSessionUpdate,
    clientSessionReset,
  }
}
