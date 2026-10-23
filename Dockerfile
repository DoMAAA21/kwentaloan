# Production image for Next.js standalone output (Easypanel / Docker).

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_SITE_URL=https://kwentaloan.cloud
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID=G-CGHP6G1YFP
ARG NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-2087073623409379
ARG NEXT_PUBLIC_ADSENSE_SLOT_HOME=4768701742
ARG NEXT_PUBLIC_ADSENSE_SLOT_CALC_TOP=8707946757
ARG NEXT_PUBLIC_ADSENSE_SLOT_CALC_MID=
ARG NEXT_PUBLIC_ADSENSE_SLOT_CONTENT=

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_GA_MEASUREMENT_ID=$NEXT_PUBLIC_GA_MEASUREMENT_ID \
    NEXT_PUBLIC_ADSENSE_CLIENT_ID=$NEXT_PUBLIC_ADSENSE_CLIENT_ID \
    NEXT_PUBLIC_ADSENSE_SLOT_HOME=$NEXT_PUBLIC_ADSENSE_SLOT_HOME \
    NEXT_PUBLIC_ADSENSE_SLOT_CALC_TOP=$NEXT_PUBLIC_ADSENSE_SLOT_CALC_TOP \
    NEXT_PUBLIC_ADSENSE_SLOT_CALC_MID=$NEXT_PUBLIC_ADSENSE_SLOT_CALC_MID \
    NEXT_PUBLIC_ADSENSE_SLOT_CONTENT=$NEXT_PUBLIC_ADSENSE_SLOT_CONTENT \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
