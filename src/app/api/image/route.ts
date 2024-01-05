import {
  CloudFlareUploadImageResponse,
  GetUploadURLResponse,
} from "@/interfaces/dto/upload/upload-image.dto"
import axios, { AxiosError, AxiosResponse, HttpStatusCode } from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const header = request.headers

  if (!header.get("Content-Type")?.includes("multipart/form-data")) {
    return NextResponse.json(
      {
        code: 1222,
        msg: "multipart/form-data 형식이어야 합니다",
      },
      { status: HttpStatusCode.BadRequest },
    )
  }

  const formData = await request.formData()

  const image = formData.get("image")

  if (!image) {
    return NextResponse.json(
      {
        code: 1222,
        msg: "업로드할 이미지를 찾을 수 없습니다",
      },
      { status: HttpStatusCode.BadRequest },
    )
  }

  try {
    const uploadURLFormData = new FormData()
    uploadURLFormData.append("requireSignedURLs", "false")

    const getUploadURLResponse = await axios.post<
      any,
      AxiosResponse<GetUploadURLResponse>
    >(
      `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVER}/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
      uploadURLFormData,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "multipart/form-data",
        },
      },
    )

    const uploadURL = getUploadURLResponse.data.result.uploadURL

    const imageFormData = new FormData()
    imageFormData.append("file", image)

    const uploadResponse = await axios.post<
      any,
      AxiosResponse<CloudFlareUploadImageResponse>
    >(uploadURL, imageFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    console.log({ data: uploadResponse.data })

    const { id } = uploadResponse.data.result

    return NextResponse.json(
      {
        code: 1111,
        msg: "업로드 성공",
        data: {
          image_url: `${process.env.NEXT_PUBLIC_CLOUDFLARE_IMAGE_SERVE}/${id}/public`,
        },
      },
      { status: HttpStatusCode.Created },
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error

      console.log("[이미지 업로드 실패]", response?.data)
    }

    return NextResponse.json(
      {
        code: 1444,
        msg: "이미지 업로드에 실패했습니다",
      },
      {
        status: HttpStatusCode.InternalServerError,
      },
    )
  }
}
