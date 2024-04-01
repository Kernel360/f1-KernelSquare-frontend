export function serializeCmToken(cmToken: string) {
  return cmToken.replace(/^cm_/g, "cm-")
}

export function deSerializeCmToken(serializedCmToken: string) {
  return `${serializedCmToken.replace(/^cm\-/g, "cm_")}`
}
