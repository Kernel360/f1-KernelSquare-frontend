import LoginForm from "@/components/form/LoginForm"
import Button from "@/components/shared/button/Button"
import {
  getActiveNavigationItem,
  navigationRoutes,
  requiredAuthRoute,
} from "@/constants/navigationRoute"
import { useClientSession } from "@/hooks/useClientSession"
import useModal from "@/hooks/useModal"
import { logout } from "@/service/auth"
import { getAuthCookie } from "@/util/actions/cookie"
import { revalidatePage } from "@/util/actions/revalidatePage"
import Link from "next/link"
import { usePathname, useSelectedLayoutSegment } from "next/navigation"
import { RiLoginBoxLine, RiLogoutBoxRLine } from "react-icons/ri"
import { toast } from "react-toastify"
import AlermNavItem from "./AlermNavItem"
import { useSetRecoilState } from "recoil"
import { HeaderMobileMenuOpenAtom } from "@/recoil/atoms/menu/headerMenu"

function MobileMenuNavigation() {
  const currentSegment = useSelectedLayoutSegment()
  const pathname = usePathname()

  const { user } = useClientSession()

  const setMenuOpen = useSetRecoilState(HeaderMobileMenuOpenAtom)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const navigationList = user
    ? [...navigationRoutes, ...requiredAuthRoute]
    : [...navigationRoutes]

  const activeItem = getActiveNavigationItem({
    segment: currentSegment,
    pathname,
  })

  return (
    <nav>
      <ul>
        {navigationList.map(({ label, icon, to, activeClassName }) => {
          const active = activeItem ? activeItem.label === label : false

          const Icon = icon

          const href = label === "마이 페이지" ? `${to}/${user?.member_id}` : to

          if (label === "알림") {
            return (
              <li key={label}>
                <AlermNavItem active={active} onClick={closeMenu} />
              </li>
            )
          }

          return (
            <li key={label}>
              <Link
                href={href}
                className="inline-flex align-top items-center gap-4 pr-4 py-4"
                onClick={closeMenu}
              >
                <Icon
                  className={`text-2xl ${
                    active ? activeClassName : "text-[#828282]"
                  }`}
                />
                <span
                  className={`${
                    active ? "font-bold text-[#333]" : "text-[#828282]"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          )
        })}
        <li>
          <AuthButton />
        </li>
      </ul>
    </nav>
  )
}

export default MobileMenuNavigation

const AuthButton = () => {
  const { user, clientSessionLogout } = useClientSession()

  const { openModal, closeModal } = useModal()

  const setMenuOpen = useSetRecoilState(HeaderMobileMenuOpenAtom)

  const appLogout = async () => {
    try {
      const { accessToken, refreshToken } = await getAuthCookie()

      if (accessToken && refreshToken) {
        await logout({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
      }
      await clientSessionLogout()

      revalidatePage("*")

      setTimeout(() => {
        toast.success("로그아웃에 성공했습니다", {
          position: "bottom-center",
        })
      }, 200)
    } catch (error) {
      toast.error("로그아웃에 실패했습니다", {
        position: "bottom-center",
      })
    }
  }

  if (user)
    return (
      <Button className="pl-0 gap-4 py-4" onClick={appLogout}>
        <RiLogoutBoxRLine className="text-2xl text-[#828282]" />
        <span className="font-normal text-base">로그아웃</span>
      </Button>
    )

  return (
    <Button
      name="login"
      className="pl-0 py-4 gap-4"
      onClick={() => {
        setMenuOpen(false)
        closeModal()

        setTimeout(() => {
          openModal({
            content: <LoginForm />,
          })
        }, 0)
      }}
    >
      <RiLoginBoxLine className="text-[#828282] text-2xl" />
      <span className="font-normal text-base">로그인</span>
    </Button>
  )
}
