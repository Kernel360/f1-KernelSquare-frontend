"use client"

import SearchButton from "./MobileSearchButton"
import MobileMenu from "./menu/MobileMenu"

function MobileArea() {
  return (
    <div className="flex pc:hidden justify-center items-center shrink-0 gap-0.5">
      <div className="sm:hidden flex">
        <SearchButton />
      </div>
      <MobileMenu />
    </div>
  )
}

export default MobileArea
