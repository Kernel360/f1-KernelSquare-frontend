// [TODO] search

import Button from "@/components/shared/button/Button"
import SearchField from "./SearchField"
import SearchModal from "./SearchModal"
import { Icons } from "@/components/icons/Icons"
import useModal from "@/hooks/useModal"

function SearchArea() {
  const { openModal } = useModal()

  return (
    <>
      <SearchField />
      <div className="inline-flex flex-1 justify-end sm:hidden">
        <Button
          onClick={() =>
            openModal({
              containsHeader: false,
              content: <SearchModal />,
              classNames: "self-start mt-[72px]",
            })
          }
        >
          <Icons.Search className="text-xl" />
        </Button>
      </div>
    </>
  )
}

export default SearchArea
