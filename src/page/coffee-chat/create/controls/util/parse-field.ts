// 폼 제출 값으로 수정
export function transformDateTime(dateTimeFormat: string[]) {
  return dateTimeFormat.map((time) => time.replace(/Z$/g, ""))
}
