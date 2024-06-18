import { ACCESS_TOKEN_KEY } from "@/constants/token"
import axios from "axios"
import { getCookie } from "@/util/actions/cookie"

const createAPIInstance = (domain?: "alert") => {
  const axiosInstance = axios.create({
    baseURL:
      domain === "alert"
        ? process.env.NEXT_PUBLIC_SSE
        : process.env.NEXT_PUBLIC_SERVER,
    withCredentials: true,
  })

  axiosInstance.interceptors.request.use(
    async (request) => {
      /*
        요청 인터셉터

        - Authorization header

        - 서버 환경일 때 백엔드에서 설정한 쿠키가 있을 경우 전달하기 위해 cookie를 설정
      */

      // server
      if (typeof window === "undefined") {
        const cookies = await import("next/headers").then((mod) => mod.cookies)
        const cookie = await import("cookie")

        const accessToken = cookies().get(ACCESS_TOKEN_KEY)

        if (accessToken) {
          request.headers.Authorization = `Bearer ${accessToken.value}`
        }

        const cookieList = cookies().getAll()

        if (cookieList.length) {
          const cookies = cookieList.reduce((acc, currentCookie, index) => {
            const { name, value } = currentCookie

            return `${acc}${cookie.serialize(name, value)}${
              index === cookieList.length - 1 ? "" : "; "
            }`
          }, "")

          request.headers.Cookie = cookies
        }

        return request
      }

      // client
      const accessToken = await getCookie(ACCESS_TOKEN_KEY)

      if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken.value}`
      }

      return request
    },
    (error) => {
      return error
    },
  )

  return axiosInstance
}

const createFireBaseApiInstance = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SITE_URL,
    withCredentials: true,
  })

  axiosInstance.interceptors.request.use((request) => {
    request.headers.Authorization = process.env.NEXT_PUBLIC_FIREBASE_ACCESS_KEY

    return request
  })

  return axiosInstance
}

export const apiInstance = createAPIInstance()
export const alertApiInstance = createAPIInstance("alert")
export const firebaseApiInstance = createFireBaseApiInstance()
