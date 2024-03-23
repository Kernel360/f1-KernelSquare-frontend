interface OAuthGithubErrorFieldProps {
  fieldName: string
  payload: React.ReactNode
}

function OAuthGithubErrorField({
  fieldName,
  payload,
}: OAuthGithubErrorFieldProps) {
  return (
    <div className="w-full flex items-start break-all">
      <div className="w-[80px] shrink-0 flex justify-between items-start align-top gap-1 mr-4">
        <span className="text-colorsDarkGray font-bold">{fieldName}</span>
        <span className="text-colorsGray font-medium"> | </span>
      </div>
      <div className="text-secondary">{payload}</div>
    </div>
  )
}

export default OAuthGithubErrorField
