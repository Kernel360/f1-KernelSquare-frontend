"use client"

import { atom } from "recoil"

export type CheckDuplicateFieldKeys = "email" | "nickname"

/**
 * signup 필드 중복 관련 상태
 *
 * ---
 *
 * checkedDuplicate: **중복체크 진행 여부** boolean
 *
 * isDuplicate: **중복 여부** boolean
 */
export interface FieldDuplicateState {
  checkedDuplicate: boolean
  isDuplicate: boolean
}

export interface SignupDuplicateState
  extends Record<CheckDuplicateFieldKeys, FieldDuplicateState> {}

/**
 * 중복체크 필드 기본 값
 *
 * @see {@link FieldDuplicateState}
 *
 * ---
 *
 * checkedDuplicate: false
 *
 * isDuplicate: false
 */
export const duplicateDefaultState: SignupDuplicateState = {
  email: {
    checkedDuplicate: false,
    isDuplicate: false,
  },
  nickname: {
    checkedDuplicate: false,
    isDuplicate: false,
  },
}

export const duplicateState = atom<SignupDuplicateState>({
  key: "signup-duplicate-atom",
  default: {
    ...duplicateDefaultState,
  },
})
