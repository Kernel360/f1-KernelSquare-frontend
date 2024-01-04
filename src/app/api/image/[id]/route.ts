import axios, { AxiosError, HttpStatusCode } from "axios"
import { NextRequest, NextResponse } from "next/server"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_SERVER}/accounts/${process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/images/v1/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    )

    return NextResponse.json(
      {
        code: 3333,
        msg: "이미지 삭제에 성공했습니다",
      },
      {
        status: HttpStatusCode.Ok,
      },
    )
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error

      console.log("[이미지 삭제 실패]", response?.data)
    }

    return NextResponse.json(
      {
        code: 2222,
        msg: "이미지 삭제에 실패했습니다",
      },
      {
        status: HttpStatusCode.InternalServerError,
      },
    )
  }
}
