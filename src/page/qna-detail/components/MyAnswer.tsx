import MdEditor from "./Markdown/MdEditor"

const MyAnswer: React.FC<{ id: number }> = ({ id }) => {
  return (
    <div className="max-w-full box-border border border-colorsGray rounded-lg p-2 my-5">
      <div>질문 작성</div>
      <MdEditor />
    </div>
  )
}

export default MyAnswer
