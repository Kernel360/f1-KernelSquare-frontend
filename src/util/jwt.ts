"use server"

import jwt, { DecodeOptions, JwtPayload, Secret } from "jsonwebtoken"

export async function jwtSign(
  payload: string | object | Buffer,
  secretOrPrivateKey: string,
  options?: jwt.SignOptions,
) {
  return jwt.sign(payload, secretOrPrivateKey, options)
}

export async function jwtVerify(
  token: string,
  secretOrPublicKey: Secret,
  options?: jwt.VerifyOptions,
) {
  return jwt.verify(token, secretOrPublicKey, options) as JwtPayload & {
    id: number
  }
}

export async function jwtDecode(token: string, options?: DecodeOptions) {
  return jwt.decode(token, options) as JwtPayload & { id: number }
}
