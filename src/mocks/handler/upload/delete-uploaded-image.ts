import { ApiStatus } from "@/constants/response/api"
import { DeleteImagesResponse } from "@/interfaces/dto/upload/delete-images.dto"
import { RouteMap } from "@/service/route-map"
import { DefaultBodyType, HttpResponse, PathParams, http } from "msw"

export const mockDeleteUploadedImageApi = http.delete<
  PathParams,
  DefaultBodyType,
  DeleteImagesResponse
>(
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
)
