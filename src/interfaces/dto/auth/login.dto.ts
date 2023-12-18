import { LoginFormData } from "@/interfaces/form"
import { APIResponse } from "../api-response"

export interface LoginRequest extends LoginFormData {}

export interface LoginResponse extends APIResponse {}
