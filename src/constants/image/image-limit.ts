type ImageSizeUnit = "KB" | "MB"
type ImageAccept = "image/jpeg" | "image/png" | "image/svg+xml" | "image/gif"

export interface ImageLimits {
  unitToSize: Record<ImageSizeUnit, number>
  size: {
    amount: number
    unit: ImageSizeUnit
  }
  accept: ImageAccept[]
  maximumLength: number
  getSizeLabel(): string
  getSize(): number
  getImageAccept(): string
  getAcceptListLabel(): string
}

class BaseImageLimits implements ImageLimits {
  unitToSize = {
    KB: 1024,
    MB: Math.pow(1024, 2),
  }
  size: { amount: number; unit: ImageSizeUnit }
  accept: ImageAccept[]
  maximumLength: number

  constructor(initial?: {
    size?: { amount: number; unit: ImageSizeUnit }
    accept?: ImageAccept[]
    maximumLength?: number
  }) {
    this.size = initial?.size ?? { amount: 3, unit: "MB" }
    this.accept = initial?.accept ?? [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/gif",
    ]
    this.maximumLength = initial?.maximumLength ?? 1
  }

  getSizeLabel(): string {
    const { amount, unit } = this.size
    return `${amount}${unit}`
  }

  getSize(): number {
    const { amount, unit } = this.size
    return amount * this.unitToSize[unit]
  }

  getImageAccept(): string {
    return this.accept.join(", ")
  }

  getAcceptListLabel(): string {
    return this.accept
      .map((imageType) => imageType.replace("image/", "").replace("+xml", ""))
      .join(", ")
  }
}

export const baseImageLimitInstance = new BaseImageLimits()
