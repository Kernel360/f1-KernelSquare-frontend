import Button from "@/components/shared/button/Button"
import SearchModal from "../../search/SearchModal"
import { IoSearchOutline } from "react-icons/io5"
import useModal from "@/hooks/useModal"
import { useRecoilValue } from "recoil"
import { HeaderMobileMenuOpenAtom } from "@/recoil/atoms/menu/headerMenu"

function MobileSearchButton() {
  const menuOpen = useRecoilValue(HeaderMobileMenuOpenAtom)
  const { openModal } = useModal()

  if (menuOpen) return null

  return (
    <Button
      className="px-1"
      onClick={() => {
        openModal({
          closeableDim: true,
          containsHeader: false,
          content: <SearchModal />,
          classNames: "w-full self-start",
        })
      }}
    >
      <IoSearchOutline className="text-xl" />
    </Button>
  )
}

export default MobileSearchButton
