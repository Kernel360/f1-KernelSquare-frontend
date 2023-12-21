import { SignupFormData } from "@/interfaces/form"
import { APIResponse } from "../api-response"

export interface SignupRequest extends SignupFormData {}

export interface SignupResponse extends APIResponse {}
