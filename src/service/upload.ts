import {
  DeleteImageRequest,
  DeleteImageResponse,
} from "@/interfaces/dto/upload/delete-image.dto"
import {
  UploadImageRequest,
  UploadImageResponse,
} from "@/interfaces/dto/upload/upload-image.dto"
import { AxiosResponse } from "axios"
import { imageApiInstance } from "./axios"

export async function uploadImage({ image }: UploadImageRequest) {
  const formData = new FormData()

  formData.append("image", image)

  const res = await imageApiInstance.post<
    any,
    AxiosResponse<UploadImageResponse>
  >("/api/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })

  return res
}

export async function deleteImage({ id }: DeleteImageRequest) {
  const res = imageApiInstance.delete<any, AxiosResponse<DeleteImageResponse>>(
    `/api/image/${id}`,
  )

  return res
}
