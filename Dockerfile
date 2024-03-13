FROM node:20-alpine

RUN apk add --no-cache libc6-compat

COPY . /app

WORKDIR /app

RUN npm install -g pnpm@8.11.0
RUN pnpm install

ARG NEXT_PUBLIC_API_MOCKING \ 
NEXT_PUBLIC_SITE_URL \ 
NEXT_PUBLIC_SERVER \ 
NEXT_PUBLIC_WS \ 
NEXT_PUBLIC_CRYPTO_IV_SECRET \ 
NEXT_PUBLIC_CRYPTO_IV_LENGTH \
SENTRY_AUTH_TOKEN \
NEXT_PUBLIC_KAKAO_MAP \
NEXT_PUBLIC_GA_ACTIVE \
NEXT_PUBLIC_GA_ID

ENV NEXT_PUBLIC_API_MOCKING=$NEXT_PUBLIC_API_MOCKING \ 
NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \ 
NEXT_PUBLIC_SERVER=$NEXT_PUBLIC_SERVER \ 
NEXT_PUBLIC_WS=$NEXT_PUBLIC_WS \ 
NEXT_PUBLIC_CRYPTO_IV_SECRET=$NEXT_PUBLIC_CRYPTO_IV_SECRET \ 
NEXT_PUBLIC_CRYPTO_IV_LENGTH=$NEXT_PUBLIC_CRYPTO_IV_LENGTH \
SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN \
NEXT_PUBLIC_KAKAO_MAP=$NEXT_PUBLIC_KAKAO_MAP \
NEXT_PUBLIC_GA_ACTIVE=$NEXT_PUBLIC_GA_ACTIVE \
NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
