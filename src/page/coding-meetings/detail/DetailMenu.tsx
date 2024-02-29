"use client"

import Spacing from "@/components/shared/Spacing"
import Button from "@/components/shared/button/Button"
import { useClientSession } from "@/hooks/useClientSession"
import useModal from "@/hooks/useModal"
import { CodingMeetingAuthor } from "@/interfaces/coding-meetings"
import { APIResponse } from "@/interfaces/dto/api-response"
import {
  closeCodingMeeting,
  deleteCodingMeeting,
} from "@/service/coding-meetings"
import { revalidatePage } from "@/util/actions/revalidatePage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import Dropdown from "rc-dropdown"
import Menu, { MenuItem } from "rc-menu"
import { MdMoreVert } from "react-icons/md"
import { toast } from "react-toastify"
import { twMerge } from "tailwind-merge"

interface DetailMenuProps {
  token: string
  author: CodingMeetingAuthor
  closed: boolean
}

function DetailMenu({ token, author, closed }: DetailMenuProps) {
  const { user } = useClientSession()

  const isAuthor = user?.nickname === author.member_nickname

  if (!isAuthor) return null

  return (
    <Dropdown
      trigger={["click"]}
      overlay={<DetailDropDownMenu token={token} closed={closed} />}
    >
      <Button className="w-fit flex justify-center items-center">
        <MdMoreVert className="shrink-0 text-2xl" />
      </Button>
    </Dropdown>
  )
}

export default DetailMenu

function DetailDropDownMenu({
  token,
  closed,
}: {
  token: string
  closed: boolean
}) {
  const { push } = useRouter()

  const { openModal } = useModal()

  const dropdownMenu = ["수정하기", "삭제하기", "마감하기"] as const

  const handleMenu = (menu: "수정하기" | "삭제하기" | "마감하기") => () => {
    switch (menu) {
      case "수정하기":
        push(`/coding-meetings/post/${token}`)

        break
      case "마감하기":
        openModal({
          closeableDim: false,
          containsHeader: false,
          content: <DetailConfirmModal token={token} type="close" />,
        })

        break
      case "삭제하기":
        openModal({
          closeableDim: false,
          containsHeader: false,
          content: <DetailConfirmModal token={token} type="delete" />,
        })

        break
    }
  }

  const textClassName = (menu: "수정하기" | "마감하기" | "삭제하기") =>
    twMerge("text-[#4F4F4F]", menu === "삭제하기" && "text-[#EB5858]")

  return (
    <Menu className="!py-2 !text-sm">
      {dropdownMenu.map((menu) => {
        if (menu === "마감하기" && closed) return null

        return (
          <MenuItem
            key={`rc-detail-menu-item-${menu}`}
            onClick={handleMenu(menu)}
            className="cursor-pointer flex w-full justify-center items-center !px-4 !py-2 box-border bg-white hover:bg-colorsLightGray"
          >
            <span className={textClassName(menu)}>{menu}</span>
          </MenuItem>
        )
      })}
    </Menu>
  )
}

function DetailConfirmModal({
  token,
  type,
}: {
  token: string
  type: "close" | "delete"
}) {
  const Modal = () => {
    switch (type) {
      case "close":
        return <CloseModal token={token} />
      case "delete":
        return <DeleteModal token={token} />
      default:
        return null
    }
  }

  return (
    <div className="w-full sm:w-[320px]">
      <Modal />
    </div>
  )
}

function DeleteModal({ token }: { token: string }) {
  const { replace } = useRouter()

  const queryClient = useQueryClient()

  const { closeModal } = useModal()

  const { mutate: deleteCodingMeetingMutate, status } = useMutation({
    mutationFn: () => deleteCodingMeeting({ coding_meeting_token: token }),
    onSuccess: () => {
      closeModal()

      toast.success("모각코 삭제 성공", { position: "top-center" })

      queryClient.invalidateQueries({
        queryKey: ["codingMeeting", "list"],
      })

      replace("/coding-meetings")
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>

        toast.error(response?.data.msg ?? "삭제 요청이 실패했습니다", {
          position: "top-center",
          toastId: "delteServerErrorToast",
        })

        return
      }

      toast.error("삭제 요청이 실패했습니다", {
        position: "top-center",
        toastId: "deleteErrorToast",
      })
    },
  })

  const handleDelete = () => {
    if (status === "pending") return

    deleteCodingMeetingMutate()
  }

  const handleCancel = () => {
    closeModal()
  }

  return (
    <section className="w-full flex flex-col items-center">
      <h4>모각코 모임을 삭제하시겠습니까?</h4>
      <Spacing size={24} />
      <div className="flex w-full justify-center items-center gap-4">
        <Button
          disabled={status === "pending"}
          className="w-fit h-fit disabled:bg-colorsGray"
          buttonTheme="primary"
          onClick={handleDelete}
        >
          <span>{status === "pending" ? "삭제 요청중" : "삭제"}</span>
        </Button>
        <Button
          disabled={status === "pending"}
          className="w-fit h-fit disabled:bg-colorsGray"
          buttonTheme="secondary"
          onClick={handleCancel}
        >
          취소
        </Button>
      </div>
    </section>
  )
}

function CloseModal({ token }: { token: string }) {
  const queryClient = useQueryClient()

  const { closeModal } = useModal()

  const { mutate: closeCodingMeetingMutate, status } = useMutation({
    mutationFn: () => closeCodingMeeting({ coding_meeting_token: token }),
    onSuccess: () => {
      closeModal()

      toast.success("마감 상태로 전환되었습니다", { position: "top-center" })

      queryClient.invalidateQueries({
        queryKey: ["codingMeeting", "list"],
      })

      revalidatePage(`/coding-meetings/[token]`, "page")
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>

        toast.error(response?.data.msg ?? "마감요청이 실패했습니다", {
          position: "top-center",
          toastId: "closeServerErrorToast",
        })

        return
      }

      toast.error("마감 요청이 실패했습니다", {
        position: "top-center",
        toastId: "closeErrorToast",
      })
    },
  })

  const handleDelete = () => {
    if (status === "pending") return

    closeCodingMeetingMutate()
  }

  const handleCancel = () => {
    closeModal()
  }

  return (
    <section className="w-full flex flex-col items-center">
      <h4>모각코 모임 모집을 마감하시겠습니까?</h4>
      <Spacing size={24} />
      <div className="flex w-full justify-center items-center gap-4">
        <Button
          disabled={status === "pending"}
          className="w-fit h-fit disabled:bg-colorsGray"
          buttonTheme="primary"
          onClick={handleDelete}
        >
          {status === "pending" ? "마감 요청중" : "마감"}
        </Button>
        <Button
          className="w-fit h-fit disabled:bg-colorsGray"
          buttonTheme="secondary"
          onClick={handleCancel}
        >
          취소
        </Button>
      </div>
    </section>
  )
}
