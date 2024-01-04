import { ACCESS_TOKEN_KEY } from "@/constants/token"
import { getCookie } from "cookies-next"
import axios from "axios"

const createAPIInstance = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER,
    withCredentials: true,
  })

  /*
    서버에서의 timeout 처리가 없고,
    UX 측면에서 timout을 적용할 필요가 있을 경우,
    timeout 설정
    (timeout을 고려해야할 만큼 
    서버에서 응답이 오지 않는 경우는 드물수 있어,
    추후 상황에 따라 적용할지 결정)
  */
  // axiosInstance.defaults.timeout = 1000 * 30
  // axiosInstance.defaults.timeoutErrorMessage = 'timeout message'

  axiosInstance.interceptors.request.use(
    async (request) => {
      // server
      /*
        client 환경은 브라우저에서
        자동으로 쿠키를 전달해주지만,
        server 환경은 브라우저 환경이 아니라서,
        수동으로 전달해줘야 함
      */
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
      const accessToken = getCookie(ACCESS_TOKEN_KEY)

      if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`
      }

      return request
    },
    (error) => {
      /*
        [TODO]
        자동 로그인 할 경우 refresh token 로직 적용
       */

      return error
    },
  )

  axiosInstance.interceptors.response.use(
    (res) => {
      // 개발단계에서 setcookie 확인을 위한 로그
      // 삭제될 수 있음
      console.log(res.config.url, "[setCookie]", res.headers["set-cookie"])

      return res
    },
    (error) => {
      throw error
    },
  )

  return axiosInstance
}

const createImageAPIInstance = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_IMAGE_SERVER,
    withCredentials: true,
  })

  /*
    서버에서의 timeout 처리가 없고,
    UX 측면에서 timout을 적용할 필요가 있을 경우,
    timeout 설정
    (timeout을 고려해야할 만큼 
    서버에서 응답이 오지 않는 경우는 드물수 있어,
    추후 상황에 따라 적용할지 결정)
  */
  // axiosInstance.defaults.timeout = 1000 * 30
  // axiosInstance.defaults.timeoutErrorMessage = 'timeout message'

  axiosInstance.interceptors.request.use(
    async (request) => {
      // server
      /*
        client 환경은 브라우저에서
        자동으로 쿠키를 전달해주지만,
        server 환경은 브라우저 환경이 아니라서,
        수동으로 전달해줘야 함
      */
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
      const accessToken = getCookie(ACCESS_TOKEN_KEY)

      if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`
      }

      return request
    },
    (error) => {
      /*
        [TODO]
        자동 로그인 할 경우 refresh token 로직 적용
       */

      return error
    },
  )

  axiosInstance.interceptors.response.use(
    (res) => {
      // 개발단계에서 setcookie 확인을 위한 로그
      // 삭제될 수 있음
      console.log(res.config.url, "[setCookie]", res.headers["set-cookie"])

      return res
    },
    (error) => {
      throw error
    },
  )

  return axiosInstance
}

export const apiInstance = createAPIInstance()
export const imageApiInstance = createImageAPIInstance()
