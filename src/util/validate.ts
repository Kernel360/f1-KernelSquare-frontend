import validator from "validator"

export class Validator {
  static instance: Validator

  constructor() {
    if (Validator.instance) return Validator.instance

    Validator.instance = this
  }

  validateEmail(email: string = "") {
    return {
      get allCheck() {
        return () => this.format() && this.length()
      },
      format() {
        return validator.isEmail(email)
      },
      length() {
        return validator.isLength(email, { min: 6, max: 40 })
      },
    }
  }

  validateNickname(nickname: string = "") {
    return {
      get allCheck() {
        return () => this.format() && this.length()
      },
      format() {
        if (!nickname) {
          return false
        }

        // [TODO] 숫자허용시 수정

        const regexp = new RegExp(`[가-힣a-zA-Z]{${nickname.length}}`)

        return regexp.test(nickname)
      },
      length() {
        return validator.isLength(nickname, { min: 2, max: 8 })
      },
    }
  }

  validatePassword(password: string = "") {
    return {
      get allCheck() {
        return () => this.format() && this.length()
      },
      format() {
        return validator.isStrongPassword(password, {
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          minLength: 4,
        })
      },
      length() {
        return validator.isLength(password, { min: 8, max: 16 })
      },
    }
  }
}
