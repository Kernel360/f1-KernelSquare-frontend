export function replaceAllMarkdownImageLink(
  markdown: string,
  { targetLink, replaceValue }: { targetLink: string; replaceValue: string },
) {
  if (!markdown || !targetLink) return null

  return markdown.replaceAll(
    new RegExp(
      `!\\[.*?\\]\\(${targetLink.replaceAll(/([/.?])/g, `\\$1`)}\\)`,
      "gm",
    ),
    replaceValue,
  )
}

export function findImageLinkUrlFromMarkdown(markdown?: string) {
  if (!markdown) return null

  const markdownImageLinkRegExp = /\!\[.*?\]\((?<url>(.*?))\)/gm

  const matchedMarkdownImageLinks = markdown.matchAll(markdownImageLinkRegExp)

  return Array.from(matchedMarkdownImageLinks).map(
    (resultArray) => resultArray.groups!.url,
  )
}

export function getImageIdFromLink(imageUrl: string) {
  if (!imageUrl) return null

  if (process.env.NEXT_PUBLIC_API_MOCKING !== "enabled") return null

  const id = getMockImageIdFromLink(imageUrl)

  return id
}

function getMockImageIdFromLink(mockImageUrl: string) {
  if (!mockImageUrl) return null

  // https://picsum.photos/id/${targetMockImageId}/400/250
  const idRegExp = /(?<=id\/)(?<id>(.*?))(?=\/)/g

  const imageIdResultArray = mockImageUrl.match(idRegExp)

  if (!imageIdResultArray) return null

  return imageIdResultArray[0]
}
