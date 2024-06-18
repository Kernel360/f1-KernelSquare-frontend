export function isSupportServiceWorker() {
  return (
    !!globalThis?.Notification &&
    !!globalThis?.navigator &&
    "serviceWorker" in navigator
  )
}
