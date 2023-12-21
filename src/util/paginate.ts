interface PaginationFnOptions {
  perPage?: number
}

type Pages<T = unknown> = Array<Array<T>>

/*
 DX를 위해 유효하지 않은 인자일 경우 null로 반환한다면 
 ResultType | null 형태의 타입이 될 수 있음
*/
type PaginationFnResult<T = unknown> = {
  totalItemsCount: number
  maximumPage: number
  pages: Pages<T>
}

// function isInt<T extends number>(target: T): target is T {
//   if (typeof target !== "number") return false

//   return !`${target.toString()}`.includes(".")
// }

export function generatePagination<T = unknown>(
  targetList: Array<T>,
  { perPage = 10 }: PaginationFnOptions = { perPage: 10 },
): PaginationFnResult<T> {
  /*
    DX를 위해 유효성 검사를 통한 에러를 제공해줘야 할 경우
    아래와 같이 구현

    현재는 유효한 값만 입력한다고 가정하고 진행
  */
  // if (perPage <= 0) {
  //   console.error("perPage는 0보다 큰 숫자이어야 합니다")

  //   return null
  // }

  // if (!isInt(perPage)) {
  //   console.error("perPage는 정수이어야 합니다")

  //   return null
  // }

  const totalItemsCount = targetList.length
  const maximumPage = Math.ceil(totalItemsCount / perPage)

  const pages: Pages<T> = []

  for (let page = 0; page < maximumPage; page++) {
    const offset = page * perPage
    const end = offset + perPage

    pages.push(targetList.slice(offset, end))
  }

  return {
    totalItemsCount,
    maximumPage,
    pages,
  }
}
