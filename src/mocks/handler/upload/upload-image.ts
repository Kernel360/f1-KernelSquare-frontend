import { HttpResponse, PathParams, http } from "msw"
import { RouteMap } from "@/service/route-map"
import type {
  UploadImagesRequest,
  UploadImagesResponse,
} from "@/interfaces/dto/upload/upload-images.dto"
import { HttpStatusCode } from "axios"
import { uploadedFileImages } from "@/mocks/db/image"

export const mockUploadImageApi = http.post<
  PathParams,
  UploadImagesRequest,
  UploadImagesResponse
>(
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
)
