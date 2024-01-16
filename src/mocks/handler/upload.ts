import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"
import { uploadedFileImages } from "../db/image"
import { ApiStatus } from "@/constants/response/api"
import { RouteMap } from "@/service/route-map"
import type {
  UploadImagesRequest,
  UploadImagesResponse,
} from "@/interfaces/dto/upload/upload-images.dto"
import { HttpStatusCode } from "axios"
import { DeleteImagesResponse } from "@/interfaces/dto/upload/delete-images.dto"

export const uploadHandler = [
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
  http.delete<PathParams, DefaultBodyType, DeleteImagesResponse>(
    `${process.env.NEXT_PUBLIC_SERVER}${RouteMap.images.deleteImages}`,
    async ({ request }) => {
      const header = request.headers
      const token = header.get("Authorization")

      if (!token) {
        const { Code, HttpStatus } = ApiStatus.Image.delete.Unauthorized

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

      const url = new URL(request.url)
      const imageURL = url.searchParams.get("imageUrl")

      if (!imageURL) {
        const { Code, HttpStatus } = ApiStatus.Image.delete.BadRequest

        return HttpResponse.json(
          {
            code: Code,
            msg: "잘못된 요청입니다",
          },
          {
            status: HttpStatus,
          },
        )
      }

      const { Code, HttpStatus } = ApiStatus.Image.delete.Ok

      return HttpResponse.json(
        {
          code: Code,
          msg: "이미지 삭제 완료",
        },
        {
          status: HttpStatus,
        },
      )
    },
  ),
]
