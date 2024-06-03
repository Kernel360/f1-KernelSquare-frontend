interface UploadedImageSectionProps {
  children: React.ReactNode
  counter?: React.ReactNode
}

function UploadedImageSection({
  counter,
  children,
}: UploadedImageSectionProps) {
  return (
    <section>
      {counter ? (
        <div className="flex w-full items-center gap-x-1">
          <div className="text-xs text-colorsDarkGray font-medium">
            업로드된 이미지
          </div>
          {counter}
        </div>
      ) : null}
      <div className="p-1 bg-info">{children}</div>
    </section>
  )
}

export default UploadedImageSection
