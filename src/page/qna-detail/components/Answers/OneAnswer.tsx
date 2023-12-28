import type { Answer } from "@/interfaces/answer"
import MdViewer from "../Markdown/MdViewer"
import Image from "next/image"

const OneAnswer: React.FC<{ answer: Answer }> = ({ answer }) => {
  const isEdited = answer.created_date !== answer.modified_date

  return (
    <div className="border-b-[1px] border-b-gray my-5">
      <div className="flex">
        <div>{answer.vote_count}</div>
        <MdViewer content={answer.content} />
      </div>
      <div className="flex">
        <div>
          답변일시: {answer.created_date} {isEdited && "(수정됨)"}
        </div>
        <div>
          <Image
            src={answer.member_image_url}
            alt="답변자 프로필 이미지"
            width={30}
            height={30}
          />
        </div>
        <div>
          <div>{answer.created_by}</div>
          <div>Lv.</div>
        </div>
      </div>
    </div>
  )
}

export default OneAnswer
