import Button from "@/components/shared/button/Button"
import { Icons } from "@/components/icons/Icons"
import { IoIosMenu } from "react-icons/io"
import MobileMenuList from "./MobileMenuList"
import { useRecoilState } from "recoil"
import { HeaderMobileMenuOpenAtom } from "@/recoil/atoms/menu/headerMenu"

function MobileMenu() {
  const [menuOpen, setMenuOpen] = useRecoilState(HeaderMobileMenuOpenAtom)

  const handleMenuOpen = () => {
    setMenuOpen((prev) => !prev)
  }

  return (
    <div className="flex justify-center items-center shrink-0">
      <Button className="px-1" onClick={handleMenuOpen}>
        {menuOpen ? (
          <Icons.Close className="text-xl" />
        ) : (
          <IoIosMenu className="text-xl" />
        )}
      </Button>
      {menuOpen ? (
        <div
          className="fixed z-[10] left-0 top-[--height-header] w-full h-full bg-black/30"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      {menuOpen ? <MobileMenuList /> : null}
    </div>
  )
}

export default MobileMenu
