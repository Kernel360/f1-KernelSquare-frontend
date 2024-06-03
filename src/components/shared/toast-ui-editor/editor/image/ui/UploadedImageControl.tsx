import Button from "@/components/shared/button/Button"
import { MdClose } from "react-icons/md"

interface UploadedImageControlProps {
  onDelete: () => void
  onAddLinkToContent: () => void
}

function UploadedImageControl({
  onDelete,
  onAddLinkToContent,
}: UploadedImageControlProps) {
  return (
    <>
      <div className="absolute right-0.5 top-0.5">
        <DeleteUploadedImageButton onDelete={onDelete} />
      </div>
      <div className="absolute left-0 bottom-0 w-full flex bg-black/40">
        <AddLinkToContentButton onAddLinkToContent={onAddLinkToContent} />
      </div>
    </>
  )
}

export default UploadedImageControl

const DeleteUploadedImageButton = ({
  onDelete,
}: Pick<UploadedImageControlProps, "onDelete">) => {
  return (
    <Button
      className="p-0.5 bg-black/40 rounded-full text-white pointerhover:hover:text-danger pointerhover:hover:bg-white"
      onClick={onDelete}
    >
      <MdClose />
    </Button>
  )
}

const AddLinkToContentButton = ({
  onAddLinkToContent,
}: Pick<UploadedImageControlProps, "onAddLinkToContent">) => {
  return (
    <Button
      className="p-0 w-full text-xs rounded-none text-white pointerhover:hover:text-primary pointerhover:hover:bg-white"
      onClick={onAddLinkToContent}
    >
      주소 삽입
    </Button>
  )
}
