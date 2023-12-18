import { APIResponse } from "../api-response"

export interface DuplicateCheckEmailRequest {
  email: string
}

export interface DuplicateCheckEmailResponse extends APIResponse {}
