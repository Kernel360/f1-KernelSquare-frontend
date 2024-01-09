type MessageKey = "noAnswer" | "myQuestion"

type Message = {
  [key in MessageKey]: string
}

const message: Message = {
  noAnswer:
    "아직 작성된 답변이 존재하지 않습니다. 첫 번째 답변의 주인공이 되어보세요!",
  myQuestion: "아직 작성된 답변이 존재하지 않습니다.",
}

export default message
