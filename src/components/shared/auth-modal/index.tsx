import dynamic from "next/dynamic"

const AuthGuardModal = dynamic(
  () => import("@/components/shared/auth-modal/AuthGuardModal"),
  { ssr: false },
)

export default AuthGuardModal
