// cumulation 값도 필요할 경우
// type level = {
//   level: number
//   experience?: number
//   cumulation: number
// }
// const levelStandard: level[] = [
//   { level: 1, experience: 200, cumulation: 0 },
//   { level: 2, experience: 500, cumulation: 200 },
//   { level: 3, experience: 1800, cumulation: 700 },
//   { level: 4, experience: 2500, cumulation: 2500 },
//   { level: 5, experience: 5000, cumulation: 5000 },
//   { level: 6, experience: 10000, cumulation: 10000 },
//   { level: 7, experience: 20000, cumulation: 20000 },
//   { level: 8, experience: 45000, cumulation: 40000 },
//   { level: 9, experience: 100000, cumulation: 850000 },
//   { level: 10, cumulation: 1850000 },
// ] as const

interface level {
  [key: number]: number
}

const levelStandard: level = {
  1: 200,
  2: 500,
  3: 1800,
  4: 2500,
  5: 5000,
  6: 10000,
  7: 20000,
  8: 45000,
  9: 100000,
} as const

export default levelStandard
