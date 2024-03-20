/**
 * extractTextFromMarkdown
 * 마크다운에서 이미지, 링크 등을 제거하고 본문 텍스트만 남기는 함수
 * dynamic metadata에서 본문 내용을 추출해줍니다.
 * @param markdown : string
 */
export const extractTextFromMarkdown = (markdown: string) => {
  // 이미지 삭제
  markdown = markdown.replace(/!\[.*?\]\(.*?\)/g, "")

  // 링크 삭제
  markdown = markdown.replace(/\[.*?\]\(.*?\)/g, "")

  // 테이블 삭제
  markdown = markdown.replace(/\|.*?\|/g, "")

  return markdown
}

/**
 * extractImageFromMarkdown
 * 마크다운에서 이미지 주소만 추출하는 함수
 * 오픈그래프 적용 시 이미지 추출에 적용할 수 있습니다.
 * @param markdown : string
 */
export const extractImageFromMarkdown = (markdown: string) => {
  const imageRegex = /!\[.*?\]\((.*?)\)|<img.*?src=["'](.*?)["']/g
  const matches = []
  let match

  while ((match = imageRegex.exec(markdown)) !== null) {
    const url = match[1] ?? match[2]
    matches.push(url)
  }

  return matches
}
