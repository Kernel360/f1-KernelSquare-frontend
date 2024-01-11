import { DeleteImageResponse } from "@/interfaces/dto/upload/delete-image.dto"
import {
  UploadImageRequest,
  UploadImageResponse,
} from "@/interfaces/dto/upload/upload-image.dto"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"
import { uploadedFileImages } from "../db/image"
import { getImageIdFromLink } from "@/util/editor"
import { ApiStatus } from "@/constants/response/api"
import { RouteMap } from "@/service/route-map"
import type {
  UploadImagesRequest,
  UploadImagesResponse,
} from "@/interfaces/dto/upload/upload-images.dto"
import { HttpStatusCode } from "axios"

export const uploadHandler = [
  http.post<PathParams, UploadImageRequest, UploadImageResponse>(
    `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/api/image`,
    async ({ request }) => {
      /*
        - 이미지 업로드
        - Lorem Picsum(https://picsum.photos/) 을 활용하여 매번 랜덤 이미지를 얻을 수 있는 url을 리턴
      */

      try {
        const header = request.headers

        const token = header.get("Authorization")
        const contentType = header.get("Content-Type")

        if (!token) {
          const { Code, HttpStatus } = ApiStatus.Image.upload.Unauthorized
          return HttpResponse.json(
            {
              code: Code,
              msg: "인증된 사용자가 아닙니다",
            },
            {
              status: HttpStatus,
            },
          )
        }

        if (!contentType?.includes("multipart/form-data")) {
          const { Code, HttpStatus } =
            ApiStatus.Image.upload.InternalServerError
          return HttpResponse.json(
            {
              code: Code,
              msg: "유효한 페이로드가 아닙니다",
            },
            {
              status: HttpStatus,
            },
          )
        }

        const formData = await request.formData()

        const image = formData.get("image")

        if (!image) {
          const { Code, HttpStatus } = ApiStatus.Image.upload.NotFound
          return HttpResponse.json(
            {
              code: Code,
              msg: "이미지 파일을 찾을 수 없습니다",
            },
            {
              status: HttpStatus,
            },
          )
        }

        const targetMockImageId = Math.floor(Math.random() * 31)

        uploadedFileImages.push(targetMockImageId.toString())

        const { Code, HttpStatus } = ApiStatus.Image.upload.Ok

        return HttpResponse.json(
          {
            code: Code,
            msg: "이미지 업로드 성공",
            data: {
              image_url: `https://picsum.photos/id/${targetMockImageId}/400/250`,
            },
          },
          {
            status: HttpStatus,
          },
        )
      } catch (error) {
        const { Code, HttpStatus } = ApiStatus.Image.upload.InternalServerError

        return HttpResponse.json(
          {
            code: Code,
            msg: "서버 오류",
          },
          {
            status: HttpStatus,
          },
        )
      }
    },
  ),
  http.delete<{ id: string }, DefaultBodyType, DeleteImageResponse>(
    `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/api/image/:id`,
    async ({ request, params }) => {
      try {
        const header = request.headers

        const token = header.get("Authorization")

        if (!token) {
          const { Code, HttpStatus } = ApiStatus.Image.delete.Unauthorized
          return HttpResponse.json(
            {
              code: Code,
              msg: "인증된 유저가 아닙니다",
            },
            {
              status: HttpStatus,
            },
          )
        }

        const id = params.id

        if (!id) {
          const { Code, HttpStatus } = ApiStatus.Image.delete.BadRequest

          return HttpResponse.json(
            {
              code: Code,
              msg: "유효한 양식이 아닙니다",
            },
            {
              status: HttpStatus,
            },
          )
        }

        const targetIndex = uploadedFileImages.findIndex((imageUrl) => {
          const mockImageId = getImageIdFromLink(imageUrl)

          if (!mockImageId) return false

          return mockImageId === id
        })

        if (targetIndex < 0) {
          const { Code, HttpStatus } = ApiStatus.Image.delete.NotFound

          return HttpResponse.json(
            {
              code: Code,
              msg: "이미지를 찾을 수 없습니다",
            },
            {
              status: HttpStatus,
            },
          )
        }

        const { Code, HttpStatus } = ApiStatus.Image.delete.Ok

        uploadedFileImages.splice(targetIndex, 1)

        console.log("[이미지 파일 삭제]", {
          uploadedFileImages: JSON.stringify(uploadedFileImages),
        })

        return HttpResponse.json(
          {
            code: Code,
            msg: "이미지 삭제 성공",
          },
          {
            status: HttpStatus,
          },
        )
      } catch (error) {
        const { Code, HttpStatus } = ApiStatus.Image.delete.InternalServerError

        return HttpResponse.json(
          {
            code: Code,
            msg: "서버 오류",
          },
          {
            status: HttpStatus,
          },
        )
      }
    },
  ),
  http.post<PathParams, UploadImagesRequest, UploadImagesResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.images.uploadImages}`,
    async ({ request }) => {
      const header = request.headers

      const token = header.get("Authorization")
      const contentType = header.get("Content-Type")

      if (!token) {
        return HttpResponse.json(
          {
            code: 2121,
            msg: "권한이 없습니다.",
          },
          {
            status: HttpStatusCode.Unauthorized,
          },
        )
      }

      if (!contentType?.includes("multipart/form-data")) {
        return HttpResponse.json(
          {
            code: 2401,
            msg: "이미지 업로드 실패",
          },
          {
            status: HttpStatusCode.InternalServerError,
          },
        )
      }

      const targetMockImageId = Math.floor(Math.random() * 31)

      uploadedFileImages.push(targetMockImageId.toString())

      return HttpResponse.json(
        {
          code: 2440,
          msg: "이미지 업로드 완료",
          data: {
            image_url: `https://picsum.photos/id/${targetMockImageId}/400/250`,
          },
        },
        {
          status: HttpStatusCode.Created,
        },
      )
    },
  ),
]
