import validator from "validator"

export class Validator {
  static instance: Validator

  constructor() {
    if (Validator.instance) return Validator.instance

    Validator.instance = this
  }

  noSpace(value: string = "") {
    return !/[ ]/.test(value)
  }

  validateEmail(email: string = "") {
    return {
      get allCheck() {
        return () => this.format() && this.length()
      },
      format() {
        const korRegExp = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/g

        if (korRegExp.test(email)) return false

        return validator.isEmail(email)
      },
      length() {
        return validator.isLength(email.replaceAll(" ", ""), {
          min: 6,
          max: 40,
        })
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
        return validator.isLength(nickname.replaceAll(" ", ""), {
          min: 2,
          max: 8,
        })
      },
    }
  }

  validatePassword(password: string = "") {
    return {
      get allCheck() {
        return () => this.format() && this.length()
      },
      eachFormat() {
        return {
          minLowerCase: /[a-z]/.test(password),
          minUppercase: /[A-Z]/.test(password),
          minNumbers: /[0-9]/.test(password),
          minSymbols: /[-#!$@£%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(password),
        }
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
        return validator.isLength(password.replaceAll(" ", ""), {
          min: 8,
          max: 16,
        })
      },
    }
  }
}
