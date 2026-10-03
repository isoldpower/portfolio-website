# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM node:24-alpine AS build
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .

ARG CLIENT_SANITY_PROJECT_ID
ARG CLIENT_SANITY_DATASET
ARG CLIENT_SANITY_API_VERSION
ARG CLIENT_SANITY_USE_CDN=true
RUN pnpm build


FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

COPY --from=build --chown=node:node /app/.output ./.output

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1:3000/healthz || exit 1

CMD ["node", ".output/server/index.mjs"]
