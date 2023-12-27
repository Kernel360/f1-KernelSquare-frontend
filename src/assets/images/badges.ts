// 서버에서 배지 이미지 같이 오면 삭제 예정
interface badge_img {
  [key: number]: string
}

const badge_url: badge_img = {
  1: "https://imagedelivery.net/gDNaP20ZP5HjgdRwMYWErw/f1eb002d-2732-4709-4c43-18b2c1f3a900/public",
  2: "https://imagedelivery.net/gDNaP20ZP5HjgdRwMYWErw/f1eb002d-2732-4709-4c43-18b2c1f3a900/public",
  3: "https://imagedelivery.net/gDNaP20ZP5HjgdRwMYWErw/66ba745f-5f33-4dc2-fa49-76cc2e645100/public",
  4: "https://imagedelivery.net/gDNaP20ZP5HjgdRwMYWErw/66ba745f-5f33-4dc2-fa49-76cc2e645100/public",
  5: "https://imagedelivery.net/gDNaP20ZP5HjgdRwMYWErw/7e3e6416-5c1e-484d-3866-6def5477ff00/public",
  6: "https://imagedelivery.net/gDNaP20ZP5HjgdRwMYWErw/3e8cfe9c-a918-4733-9b67-aac593573700/public",
  7: "https://imagedelivery.net/gDNaP20ZP5HjgdRwMYWErw/5b215c64-cf1c-4fa9-cc70-76a05259a300/public",
  8: "https://imagedelivery.net/gDNaP20ZP5HjgdRwMYWErw/6410b78c-363c-4d4d-65cf-41092427a000/public",
  9: "https://imagedelivery.net/gDNaP20ZP5HjgdRwMYWErw/3866c147-93a0-4ab7-ce14-9a6f8e5b9f00/public",
  10: "https://imagedelivery.net/gDNaP20ZP5HjgdRwMYWErw/c278e54d-095c-446f-4d68-bdb095db3100/public",
} as const

export default badge_url
