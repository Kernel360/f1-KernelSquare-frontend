import { useEffect } from "react"
import SearchController from "./search/SearchController"
import Button from "@/components/shared/button/Button"
import { Icons } from "@/components/icons/Icons"
import useModal from "@/hooks/useModal"

function LocationDialog() {
  const { closeModal } = useModal()

  useEffect(() => {
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.removeProperty("overflow")
    }
  }, [])

  return (
    <div className="w-full bg-white p-4">
      <div className="sticky top-6 w-full">
        <Button className="p-0" onClick={closeModal}>
          <Icons.Close className="text-2xl p-0.5 absolute -right-7 -top-6" />
        </Button>
      </div>
      <h4 className="mb-3">
        <div className="text-2xl font-bold text-center">장소 검색하기</div>
      </h4>
      <SearchController />
    </div>
  )
}

export default LocationDialog
