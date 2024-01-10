import { DeleteImageResponse } from "@/interfaces/dto/upload/delete-image.dto"
import {
  UploadImageRequest,
  UploadImageResponse,
} from "@/interfaces/dto/upload/upload-image.dto"
import { HttpStatusCode } from "axios"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"
import { uploadedFileImages } from "../db/image"
import { getImageIdFromLink } from "@/util/editor"
import { RouteMap } from "@/service/route-map"
import type {
  UploadImagesRequest,
  UploadImagesResponse,
} from "@/interfaces/dto/upload/upload-images.dto"

export const uploadHandler = [
  http.post<PathParams, UploadImageRequest, UploadImageResponse>(
    `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/api/image`,
    async ({ request }) => {
      /*
        - 이미지 업로드
        - Lorem Picsum(https://picsum.photos/) 을 활용하여 매번 랜덤 이미지를 얻을 수 있는 url을 리턴
      */

      const header = request.headers

      const token = header.get("Authorization")
      const contentType = header.get("Content-Type")

      if (!token) {
        return HttpResponse.json(
          {
            code: 3233,
            msg: "인증된 사용자가 아닙니다",
          },
          {
            status: HttpStatusCode.Unauthorized,
          },
        )
      }

      if (!contentType?.includes("multipart/form-data")) {
        return HttpResponse.json(
          {
            code: 3234,
            msg: "유효한 페이로드가 아닙니다",
          },
          {
            status: HttpStatusCode.BadRequest,
          },
        )
      }

      const formData = await request.formData()

      const image = formData.get("image")

      if (!image) {
        return HttpResponse.json(
          {
            code: 3234,
            msg: "이미지 파일을 찾을 수 없습니다",
          },
          {
            status: HttpStatusCode.BadRequest,
          },
        )
      }

      const targetMockImageId = Math.floor(Math.random() * 31)

      uploadedFileImages.push(targetMockImageId.toString())

      return HttpResponse.json(
        {
          code: 3111,
          msg: "이미지 업로드 성공",
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
  http.delete<{ id: string }, DefaultBodyType, DeleteImageResponse>(
    `${process.env.NEXT_PUBLIC_IMAGE_SERVER}/api/image/:id`,
    async ({ request, params }) => {
      const id = params.id

      if (!id) {
        return HttpResponse.json(
          {
            code: 3234,
            msg: "유효한 양식이 아닙니다",
          },
          {
            status: HttpStatusCode.BadRequest,
          },
        )
      }

      const targetIndex = uploadedFileImages.findIndex((imageUrl) => {
        const mockImageId = getImageIdFromLink(imageUrl)

        if (!mockImageId) return false

        return mockImageId === id
      })

      if (targetIndex >= 0) {
        uploadedFileImages.splice(targetIndex, 1)

        console.log("[이미지 파일 삭제]", {
          uploadedFileImages: JSON.stringify(uploadedFileImages),
        })
      }

      return HttpResponse.json(
        {
          code: 3111,
          msg: "이미지 삭제 성공",
        },
        {
          status: HttpStatusCode.Ok,
        },
      )
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
