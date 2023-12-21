import { APIResponse } from "../api-response"

export interface DuplicateCheckNickNameRequest {
  nickname: string
}

export interface DuplicateCheckNickNameResponse extends APIResponse {}
