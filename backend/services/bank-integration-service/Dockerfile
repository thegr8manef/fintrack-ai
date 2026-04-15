# =============================================================================
# Bank Integration Service — Dockerfile (Multi-stage Build)
#
# Stage 1 (builder): Installs dependencies and compiles TypeScript
# Stage 2 (production): Minimal runtime image with compiled JS only
#
# Placeholder service — no external dependencies
# Port: 3009
# =============================================================================

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps && test -f node_modules/.bin/nest
COPY . .
RUN ./node_modules/.bin/nest build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3009
CMD ["node", "dist/main"]
