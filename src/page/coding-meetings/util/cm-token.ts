export function serializeCmToken(cmToken: string) {
  const serializedCmToken = cmToken.replace(/^cm_/g, "")
  const lowerCaseFirstChar = serializedCmToken[0].toLowerCase()

  return serializedCmToken.replace(/^[A-Z]/g, lowerCaseFirstChar)
}

export function deSerializeCmToken(serializedCmToken: string) {
  const upperCaseFirstChar = serializedCmToken[0].toUpperCase()
  const deSerializeCmToken = `cm_${serializedCmToken.replace(
    /^[a-z]/g,
    upperCaseFirstChar,
  )}`

  return deSerializeCmToken
}
