import { APIResponse } from "../api-response"

export type UploadImagesCategory = "member" | "question" | "answer" | "level"

export interface UploadImagesRequest {
  category: UploadImagesCategory
  file: File
}

export interface UploadImagePayload {
  image_url: string
}

export interface UploadImagesResponse extends APIResponse<UploadImagePayload> {}
