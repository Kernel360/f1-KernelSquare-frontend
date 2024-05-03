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

export function isUploadImageLinkFormat(url: string) {
  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    const mockUploadOrigin = `https://picsum.photos`

    return url.startsWith(mockUploadOrigin)
  }

  const kernelS3Origin = `https://kernel-square-bucket.s3.ap-northeast-2.amazonaws.com`

  return url.startsWith(kernelS3Origin)
}

export function getUploadedImageLinkFromMarkdown(markdown: string) {
  const imageLinks = findImageLinkUrlFromMarkdown(markdown)

  if (!imageLinks?.length) return null

  const targetImageLink = imageLinks.find((imageLink) =>
    isUploadImageLinkFormat(imageLink),
  )

  return targetImageLink ?? null
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

export const handleViewerLink =
  (domain: string) => (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).tagName !== "A") return

    const target = e.target as HTMLAnchorElement

    if (
      !target.href.startsWith("http://") ||
      !target.href.startsWith("https://")
    ) {
      e.preventDefault()

      const origin = `${window.location.origin}/${domain}`

      const targetURL = target.href.replace(`${origin}/`, "")
      const newLink = `https://${targetURL}`

      const linkElement = document.createElement("a")
      linkElement.href = newLink
      linkElement.target = "_blank"

      linkElement.click()
    }
  }
