import { layoutMeta } from "@/constants/layoutMeta"

const layoutMetaKeys = Object.keys(layoutMeta)

export function matchLayoutMetaKey(currentPath: string) {
  return layoutMetaKeys.find((path) =>
    path === "/"
      ? currentPath === "/"
      : currentPath.substring(1).includes(path),
  ) as keyof typeof layoutMeta
}
