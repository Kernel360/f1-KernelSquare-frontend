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

  const id =
    process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
      ? getMockImageIdFromLink(imageUrl)
      : getCloudFlareImageIdFromLink(imageUrl)

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

function getCloudFlareImageIdFromLink(cloudflareImageUrl: string) {
  if (!cloudflareImageUrl) return null

  // https://imagedelivery.net/<hash>/<image_id>/<variant_name>
  const regExp =
    /(?<=\.net\/)(?<hash>(.*?))\/(?<id>(.*?))(?=\/)\/(?<variant>(.*))/g

  const imageIdResultArray = Array.from(cloudflareImageUrl.matchAll(regExp))

  if (!imageIdResultArray.length) return null

  return imageIdResultArray[0].groups!.id
}
