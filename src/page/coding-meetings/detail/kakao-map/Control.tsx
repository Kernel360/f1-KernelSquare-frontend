"use client"

import { Icons } from "@/components/icons/Icons"
import Button from "@/components/shared/button/Button"
import { useState } from "react"
import { FiZoomIn, FiZoomOut } from "react-icons/fi"
import { useMap } from "react-kakao-maps-sdk"

interface DetailMapControlProps {
  maxZoomLevel: number
  minZoomLevel: number
  location: {
    x: number
    y: number
  }
}

function DetailMapControl(
  { maxZoomLevel, minZoomLevel, location }: DetailMapControlProps,
  ref: React.ForwardedRef<kakao.maps.Map>,
) {
  const map = useMap()

  const [disableZoom, setDisableZoom] = useState<{
    zoomIn: boolean
    zoomOut: boolean
  }>({
    zoomIn: false,
    zoomOut: false,
  })

  function setDisable(map: kakao.maps.Map) {
    const currentZoomLevel = map.getLevel()

    setDisableZoom({
      zoomIn: currentZoomLevel <= maxZoomLevel,
      zoomOut: currentZoomLevel >= minZoomLevel,
    })
  }

  const handleZoom =
    (type: "zoomIn" | "zoomOut") =>
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (type === "zoomIn") {
        map.setLevel(map.getLevel() - 1)
        setDisable(map)

        return
      }

      map.setLevel(map.getLevel() + 1)
      setDisable(map)
    }

  const handleMoveMeetingLocation = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    map.setCenter(new kakao.maps.LatLng(location.x, location.y))
  }

  return (
    <div className="absolute z-[4] top-2 right-2 border border-colorsDarkGray rounded-lg bg-white overflow-hidden">
      <div className="w-full flex flex-col justify-center items-center">
        <IconButton
          title={"확대"}
          onClick={handleZoom("zoomIn")}
          disabled={disableZoom.zoomIn}
        >
          <FiZoomIn />
        </IconButton>
        <IconButton
          title={"축소"}
          onClick={handleZoom("zoomOut")}
          disabled={disableZoom.zoomOut}
        >
          <FiZoomOut />
        </IconButton>
        <IconButton
          title={"모임 장소로 이동"}
          onClick={handleMoveMeetingLocation}
        >
          <Icons.MapMarker />
        </IconButton>
      </div>
    </div>
  )
}

export default DetailMapControl

function IconButton({
  children,
  onClick,
  disabled,
  title,
}: {
  children: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  title?: string
}) {
  return (
    <Button
      className="rounded-none transition-colors w-full box-border flex justify-center items-center shrink-0 p-2 hover:bg-[#E0E0E0] disabled:hover:bg-[#828282] disabled:text-colorsDarkGray disabled:bg-[#828282]"
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </Button>
  )
}
