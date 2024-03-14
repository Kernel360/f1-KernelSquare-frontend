import badge_url from "@/assets/images/badges"
import Profile from "@/components/shared/user/Profile"
import Button from "@/components/shared/button/Button"
import { useClientSession } from "@/hooks/useClientSession"
import useModal from "@/hooks/useModal"
import UserProfilePresenter from "@/page/user-profile/components/UserProfilePresenter"
import Image from "next/image"
import { IoClose } from "react-icons/io5"
import {
  DeleteMemberFunnelStep,
  DeleteMemberFunnelStepNames,
} from "./DeleteMemberModal"
import type { SessionPayload } from "@/recoil/atoms/user"
import { useFormContext } from "react-hook-form"
import { UseStepFormContext } from "@/components/shared/funnel/Funnel"

interface DeleteMemberModalHeaderProps {
  clone?: boolean
  cloneUser?: NonNullable<SessionPayload>
  onClick?: () => void
}

function DeleteMemberModalHeader({
  clone,
  cloneUser,
  onClick,
}: DeleteMemberModalHeaderProps) {
  const formContext = useFormContext() as UseStepFormContext

  const { user } = useClientSession()

  const renderUser = clone ? cloneUser : user

  const { closeModal } = useModal()

  const isProcessed = clone
    ? true
    : DeleteMemberFunnelStep.intro <
      DeleteMemberFunnelStep[formContext.step as DeleteMemberFunnelStepNames]

  return (
    <div>
      <div className="flex w-full justify-between items-center mb-1">
        <h3 className="text-sm text-colorsDarkGray font-bold">회원 탈퇴</h3>
        {formContext?.step !== "submit" && !clone ? (
          <DeleteMemberModalHeader.CloseButton
            onClick={onClick ?? closeModal}
          />
        ) : null}
      </div>
      <Divider />
      <div className={`box-border px-4 ${isProcessed ? `py-1` : `py-4`}`}>
        <div
          className={`flex w-full items-center gap-3 ${
            isProcessed ? `flex-row justify-center` : `flex-col`
          }`}
        >
          <Profile profileImage={renderUser?.image_url} />
          <div
            className={`flex flex-col ${
              isProcessed ? `items-center gap-1` : `items-center gap-3`
            }`}
          >
            <span className="text-xl font-bold text-secondary">
              {renderUser!.nickname}
            </span>
            <div className="flex gap-1 items-center">
              <div className="flex gap-1">
                <div className="relative w-4 h-4">
                  <Image
                    src={badge_url[renderUser!.level]}
                    alt="level"
                    fill
                    style={{
                      objectFit: "scale-down",
                      objectPosition: "center",
                    }}
                  />
                </div>
                <div className="text-xs text-secondary">
                  <span>LV&nbsp;</span>
                  <span>{renderUser!.level}</span>
                </div>
              </div>
              <div className="w-24">
                <UserProfilePresenter.Experience
                  experience={renderUser!.experience}
                  level={renderUser!.level}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  )
}

export default DeleteMemberModalHeader

DeleteMemberModalHeader.CloseButton = function DeleteModalCloseButton({
  onClick,
}: {
  onClick: (() => void) | (() => Promise<void>)
}) {
  return (
    <Button className="w-fit h-fit p-1" onClick={onClick}>
      <IoClose className="text-colorsDarkGray" />
    </Button>
  )
}

function Divider() {
  return <div className="w-[calc(100%+32px)] h-0.5 -mx-4 bg-colorsLightGray" />
}
