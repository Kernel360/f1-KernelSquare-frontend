import MobileMenuNavigation from "./Navigation"
import MobileMenuProfileArea from "./ProfileArea"

function MobileMenuList() {
  return (
    <div className="fixed z-[11] left-0 top-[--height-header] w-full bg-white [@media_(max-height:464px)]:overflow-auto [@media_(max-height:464px)]:max-h-[220px]">
      <div className="flex flex-col w-full px-6 py-4 box-border">
        <MobileMenuProfileArea />
        <MobileMenuNavigation />
      </div>
    </div>
  )
}

export default MobileMenuList
