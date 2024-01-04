import { APIResponse } from "../api-response"

export interface DeleteImageRequest {
  id: string
}

export interface DeleteImageResponse extends APIResponse {}

export interface DeleteImageCloudFlareResponse {
  result: any
  errors: Array<{ code: number; message: string }>
  messages: Array<{ code: number; message: string }>
  success: boolean
}
