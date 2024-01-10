const useQnADetail = () => {
  const checkNullValue = (submitValue: string | undefined) => {
    if (typeof submitValue === undefined) return true
    if (typeof submitValue === "string" && /^\s*$/.test(submitValue))
      return true
    return false
  }

  return {
    checkNullValue,
  }
}

export default useQnADetail
