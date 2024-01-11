"use client"

import { FallbackProps } from "react-error-boundary"

function UserProfileApiErrorBoundary({ error }: FallbackProps) {
  console.log({ error })

  return <>존재하지 않는 유저</>
}

export default UserProfileApiErrorBoundary
