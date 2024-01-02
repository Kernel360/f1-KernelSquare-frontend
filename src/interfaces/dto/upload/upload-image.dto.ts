import { APIResponse } from "../api-response"

export interface UploadImageRequest {
  image: Blob | File
}

type ImagePayload = {
  image_url: string
}

export interface UploadImageResponse extends APIResponse<ImagePayload> {}

export interface GetUploadURLResponse {
  result: {
    id: string
    uploadURL: string
  }
  result_info: any
  success: boolean
  errors: Array<any>
  messages: Array<any>
}

export interface CloudFlareUploadImageResponse {
  result: {
    id: string
    filename: string
    uploaded: string
    requireSignedURLs: boolean
    variants: Array<any>
  }
  success: boolean
  errors: Array<any>
  messages: Array<any>
}
