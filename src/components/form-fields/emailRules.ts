import { LoginFormData, SignupHookFormData } from "@/interfaces/form"
import {
  SignupDuplicateState,
  duplicateDefaultState,
} from "@/recoil/atoms/duplicate"
import { validatorInstance } from "@/util/validate"
import { RegisterOptions } from "react-hook-form"
import { SetterOrUpdater } from "recoil"

type Domain = "login" | "signup"

export type LoginEmailRules = Omit<
  RegisterOptions<LoginFormData, "email">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

type SignupEmailRulePayload = {
  signupDuplicate: SignupDuplicateState
  setSignupDuplicate: SetterOrUpdater<SignupDuplicateState>
}

export type SignupEmailRules = Omit<
  RegisterOptions<SignupHookFormData, "email">,
  "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>

export function emailRules(
  domain: "signup",
  payload: SignupEmailRulePayload,
): SignupEmailRules
export function emailRules(domain: "login"): LoginEmailRules
export function emailRules<T extends Domain>(
  domain: T,
  payload?: SignupEmailRulePayload,
): SignupEmailRules | LoginEmailRules {
  if (domain === "signup") {
    return {
      required: true,
      validate: (email: string) => {
        const { format, length } = validatorInstance.validateEmail(email)

        if (!format()) {
          return false
        }
        if (!length()) {
          return false
        }

        return true
      },
      onChange(event) {
        if (payload!.signupDuplicate.email.checkedDuplicate) {
          payload!.setSignupDuplicate((prev) => ({
            ...prev,
            email: {
              ...duplicateDefaultState.email,
            },
          }))
        }
      },
    }
  }
  return {
    required: true,
    validate: (email: string) => {
      const { allCheck } = validatorInstance.validateEmail(email)

      return allCheck()
    },
  }
}

// const t = emailRule('login')

// export const emailRules = <T extends Domain>(domain: T) => {
//   if (domain === "signup") {
//     return (({ signupDuplicate, setSignupDuplicate }) => ({
//       required: true,
//       validate: (email) => {
//         const { format, length } = validatorInstance.validateEmail(email)

//         if (!format()) {
//           return false
//         }
//         if (!length()) {
//           return false
//         }

//         return true
//       },
//       onChange(event) {
//         if (signupDuplicate.email.checkedDuplicate) {
//           setSignupDuplicate((prev) => ({
//             ...prev,
//             email: {
//               ...duplicateDefaultState.email,
//             },
//           }))
//         }
//       },
//     })) as SignupEmailRules
//   }

//   return {
//     required: true,
//     validate: (email) => {
//       const { allCheck } = validatorInstance.validateEmail(email)

//       return allCheck()
//     },
//   } as LoginEmailRules
// }
