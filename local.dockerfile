FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm@9
COPY --link package.json pnpm-lock.yaml ./

RUN pnpm config set store-dir /pnpm/store
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

EXPOSE 3002 

CMD ["sh", "-c", "npx prisma generate && npm run dev"]