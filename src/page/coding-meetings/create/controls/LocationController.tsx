import { CodingMeetingFormData } from "@/interfaces/form"
import { useController, useFormContext } from "react-hook-form"
import LocationDialog from "../components/section/location/LocationDialog"
import Button from "@/components/shared/button/Button"
import { Icons } from "@/components/icons/Icons"
import useModal from "@/hooks/useModal"
import { useEffect } from "react"
import { locationRules } from "./rules/location/location-rules"
import { FaExternalLinkAlt } from "react-icons/fa"

interface LocationControllerProps {
  initialLocation?: CodingMeetingFormData["location"]
}

function LocationController({ initialLocation }: LocationControllerProps) {
  const { control } = useFormContext<CodingMeetingFormData>()
  const { field } = useController({
    control,
    name: "location",
    rules: locationRules,
    defaultValue: initialLocation,
  })

  const { closeModal } = useModal()

  useEffect(() => {
    return () => {
      closeModal()
    }
  }, []) /* eslint-disable-line */

  return (
    <div
      ref={field.ref}
      tabIndex={0}
      className="focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-secondary focus:rounded-[2px]"
    >
      {field.value ? (
        <SelectedLocation location={field.value} />
      ) : (
        <LocationSelector />
      )}
    </div>
  )
}

export default LocationController

const LocationSelector = () => {
  const { openModal } = useModal()

  return (
    <Button
      id="meeting-location"
      className="relative w-full h-[41.6px] justify-start pc:justify-center border border-[#E0E0E0] bg-white pc:w-max gap-x-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300 focus-visible:outline-4 pointerhover:hover:shadow-[4px_4px_0px_0px_var(--colors-light-green)] pointerhover:hover:bg-white pointerhover:hover:-top-1 pointerhover:hover:-left-1"
      onClick={() => {
        openModal({
          closeableDim: false,
          containsHeader: false,
          content: <LocationDialog />,
          classNames:
            "w-full max-w-[540px] h-[100dvh] overflow-x-hidden overflow-y-auto break-all",
        })
      }}
    >
      <Icons.Search className="text-2xl text-[#BDBDBD]" />
      <span className="font-medium text-base text-[#BDBDBD]">
        위치를 선택해주세요
      </span>
    </Button>
  )
}

const SelectedLocation = ({
  location,
}: {
  location: CodingMeetingFormData["location"]
}) => {
  const { openModal } = useModal()

  return (
    <div className="p-1 flex w-full h-[41.6px] pc:inline-flex pc:w-fit align-top gap-x-2 border border-[#E0E0E0] bg-white rounded-md justify-between items-center">
      <span className="pl-2 font-bold block text-base">
        {location.place_name}
      </span>
      <div className="flex justify-center items-center">
        <a
          href={`https://place.map.kakao.com/${location.id}`}
          title="카카오 맵에서 확인"
          target="blank" // 탭이 열린 상태에서 클릭시 새로운 탭이 아닌 기존에 열린 탭에서 열림
          className="group pointerhover:hover:bg-info rounded-md p-1"
        >
          <FaExternalLinkAlt className="text-sm text-secondary pointerhover:group-hover:text-black" />
        </a>
        <Button
          className="text-sm text-secondary pointerhover:hover:text-black font-medium"
          onClick={() =>
            openModal({
              closeableDim: false,
              containsHeader: false,
              content: <LocationDialog />,
              classNames:
                "w-full max-w-[540px] h-[100dvh] overflow-x-hidden overflow-y-auto break-all",
            })
          }
        >
          수정하기
        </Button>
      </div>
    </div>
  )
}
