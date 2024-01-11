"use client"

import { Suspense } from "react"
import UserProfileContainer from "./components/UserProfileContainer"
import { ErrorBoundary } from "react-error-boundary"
import UserProfileApiErrorBoundary from "./components/UserProfileApiErrorBoundary"
import ListLoading from "@/components/shared/animation/ListLoading"

interface UserProfileProps {
  memberId: number
}

function UserProfile({ memberId }: UserProfileProps) {
  return (
    <ErrorBoundary FallbackComponent={UserProfileApiErrorBoundary}>
      <Suspense fallback={<UserProfile.Loading />}>
        <UserProfileContainer memberId={memberId} />
      </Suspense>
    </ErrorBoundary>
  )
}

UserProfile.Loading = function UserProfilePageLoading() {
  return (
    <div className="fixed left-0 top-[calc(var(--height-header)+67px)] sm:top-[--height-header] w-full h-full bg-white/60 backdrop-blur-[1px] flex justify-center items-center box-border p-1">
      <h3 className="absolute w-full top-6 flex justify-center items-center">
        <span className="inline-flex align-top justify-center items-center w-max break-all text-sm box-border px-2 py-0.5 rounded-lg border border-colorsGray bg-colorsLightGray">
          유저 프로필 페이지
        </span>
        &nbsp;를 로딩하고 있어요
      </h3>
      <div className="h-full">
        <ListLoading
          style={{
            width: "calc(100% - 80px)",
            maxWidth: "400px",
            margin: "0 auto",
            opacity: "0.5",
          }}
        />
      </div>
    </div>
  )
}

export default UserProfile
