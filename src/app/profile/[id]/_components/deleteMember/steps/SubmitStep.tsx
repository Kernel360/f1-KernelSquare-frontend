"use client"

import { FunnelStepFunctionComponentProps } from "@/components/shared/funnel/Funnel"
import { Reason } from "./ReasonFormStep"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { sleep } from "@/util/sleep"
import { useClientSession } from "@/hooks/useClientSession"
import Button from "@/components/shared/button/Button"
import { useLayoutEffect, useMemo } from "react"
import useModal from "@/hooks/useModal"
import Lottie from "lottie-react"
import checkSuccess from "@/assets/lottie/check-success.json"
import { cloneDeep } from "lodash-es"
import DeleteMemberModal from "../DeleteMemberModal"
import DeleteMemberModalHeader from "../DeleteMemberModalHeader"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { useRecoilCallback } from "recoil"
import { popupWindowAtom } from "@/recoil/atoms/popup/popupWindowAtom"
import type { SessionPayload } from "@/recoil/atoms/user"

export const deleteUserEventName = "kernel-square-delete-user"

function SubmitStep({ getValues }: FunnelStepFunctionComponentProps<Reason>) {
  const { user, clientSessionLogout } = useClientSession()

  const popupWindowSnapshot = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const popupSnapshot = await snapshot.getPromise(popupWindowAtom)

        return popupSnapshot
      },
    [],
  )

  /*
    - 새로 만드는 모달에서 유저 관련 레이아웃을 그리는 용도로 
      활용하기 위해 useMemo를 활용 함(캐시)
  */
  const memoUser = useMemo(() => cloneDeep(user), []) /* eslint-disable-line */

  const queryClient = useQueryClient()

  const { openModal, closeModal } = useModal()

  const memberId = user?.member_id

  // 화면이 렌더링되고 탈퇴 요청
  const { status, fetchStatus } = useQuery({
    queryKey: ["withdraw", memberId],
    queryFn: async ({ signal }) => {
      // const { reason, reasonDetail } = getValues()

      // const submitReason = reason === "기타" ? reasonDetail : reason

      // [TODO] 백엔드 협의 후 실제 api에 요청

      // 실제 api와의 연동은 지금 하지 않음
      // 임시 로직이므로, 이후 수정될 수 있음
      await sleep(2000)

      return { success: "ok" }
    },
  })

  if (status === "success") {
    closeModal()

    clientSessionLogout()

    openModal({
      containsHeader: false,
      closeableDim: false,
      content: <Success cloneUser={memoUser!} />,
      classNames: "w-screen sm:w-[380px]",
    })
  }

  const Render = () => {
    if (status === "error") {
      return <div>에러</div>
    }

    if (status === "success") {
      return <SuccessContent clone={false} />
    }

    if (fetchStatus === "fetching") {
      return (
        <div className="flex justify-center items-center w-full h-48">
          회원탈퇴를 진행중입니다
        </div>
      )
    }
  }

  useLayoutEffect(() => {
    const handleBeforeUnload = async (e: BeforeUnloadEvent) => {
      if (fetchStatus === "fetching") {
        queryClient.cancelQueries({
          queryKey: ["withdraw", memberId],
        })
      }

      const popup = await popupWindowSnapshot()

      popup?.postMessage(
        { type: "deleteUser" },
        process.env.NEXT_PUBLIC_SITE_URL!,
      )
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [fetchStatus, memberId]) /* eslint-disable-line  */

  return (
    <DeleteMemberModal.ContentWrapper>
      <Render />
    </DeleteMemberModal.ContentWrapper>
  )
}

export default SubmitStep

function Success({ cloneUser }: { cloneUser: NonNullable<SessionPayload> }) {
  return (
    <DeleteMemberModal.Wrapper>
      <DeleteMemberModalHeader clone={true} cloneUser={cloneUser} />
      <DeleteMemberModal.ContentWrapper>
        <SuccessContent clone={true} />
      </DeleteMemberModal.ContentWrapper>
    </DeleteMemberModal.Wrapper>
  )
}

function SuccessContent({ clone }: { clone: boolean }) {
  const { closeModal } = useModal()

  const popupWindowSnapshot = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const popupSnapshot = await snapshot.getPromise(popupWindowAtom)

        return popupSnapshot
      },
    [],
  )

  const onClick = async () => {
    const popup = await popupWindowSnapshot()

    popup?.postMessage(
      { type: "deleteUser" },
      process.env.NEXT_PUBLIC_SITE_URL!,
    )

    closeModal()

    revalidatePage("*")
  }

  return (
    <div className="flex flex-col w-full items-center">
      <Lottie className="w-20" animationData={checkSuccess} loop={false} />
      <span className="text-secondary font-bold mt-2 mb-3">
        kernel square를 이용해주셔서 감사합니다.
      </span>
      <div className="flex flex-col w-fit items-center text-sm mb-2">
        <span>고객님의 탈퇴가 완료되었습니다.</span>
        <span>앞으로 더욱 좋은 모습으로 찾아뵙겠습니다.</span>
      </div>
      <Button buttonTheme="primary" onClick={clone ? onClick : undefined}>
        확인
      </Button>
    </div>
  )
}
