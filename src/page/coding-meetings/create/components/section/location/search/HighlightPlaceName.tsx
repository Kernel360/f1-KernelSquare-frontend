import Highlight from "react-highlight-words"

interface HighlightPlaceNameProps {
  placeName: string
  typedKeyword: string
}

function HighlightPlaceName({
  placeName,
  typedKeyword,
}: HighlightPlaceNameProps) {
  const searchWords = getSearchWords({
    keyword: typedKeyword,
    text: placeName,
  })

  return (
    <Highlight
      highlightClassName="font-bold bg-transparent text-primary"
      searchWords={searchWords}
      textToHighlight={placeName}
    />
  )
}

export default HighlightPlaceName

function getSearchWords({
  keyword,
  text,
}: {
  keyword: string
  text: string
}): string[] {
  return keyword
    .split(" ")
    .map((keyword) => {
      if (text.search(keyword) > -1) {
        return [keyword]
      }

      const matchedWords = []

      let startIndex = 0

      for (let i = 0; i < keyword.length; i++) {
        const subKeyword = keyword.slice(startIndex, i + 1)

        if (text.search(subKeyword) === -1) {
          const prev = keyword.slice(startIndex, i)

          if (prev && text.search(prev) > -1) {
            matchedWords.push(prev)

            startIndex = i
            i = startIndex - 1
          }
          continue
        }

        if (i === keyword.length - 1) {
          matchedWords.push(keyword.slice(startIndex, i + 1))
        }
      }

      return matchedWords?.length ? matchedWords : []
    })
    .flatMap((value) => value)
}
