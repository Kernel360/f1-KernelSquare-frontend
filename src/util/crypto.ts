import crypto from "crypto"

const cryptoKey = process.env.NEXT_PUBLIC_CRYPTO_IV_SECRET!
const iv_length = Number(process.env.NEXT_PUBLIC_CRYPTO_IV_LENGTH!)

export const encrypt = (text: string) => {
  const iv = crypto.randomBytes(iv_length)

  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(cryptoKey).toString("hex"),
    iv,
  )

  const encrypted = cipher.update(text)

  return `${iv.toString("hex")}:${Buffer.concat([
    encrypted,
    cipher.final(),
  ]).toString("hex")}`
}

export const decrypt = (text: string) => {
  const textParts = text.split(":")
  const iv = Buffer.from(textParts.shift()!, "hex")
  const encryptedText = Buffer.from(textParts.join(":"), "hex")

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(cryptoKey).toString("hex"),
    iv,
  )

  const decrypted = decipher.update(encryptedText)

  return Buffer.concat([decrypted, decipher.final()]).toString()
}
