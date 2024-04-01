export function serializeCmToken(cmToken: string) {
  return cmToken.replace(/^cm_/g, "")
}

export function deSerializeCmToken(serializedCmToken: string) {
  return `cm_${serializedCmToken}`
}
