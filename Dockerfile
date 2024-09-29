# base
FROM node:18-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@9 --activate

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN pnpm config set store-dir /pnpm/store

# depth 
FROM base AS deps

COPY package.json pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# builder
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max_old_space_size=4096"

COPY --from=deps /app/node_modules ./node_modules
COPY .env.production .env.production
COPY . .

RUN npx prisma generate \
    && pnpm run build

# runner
FROM node:18-alpine AS runner
WORKDIR /app
EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]