# =============================================================================
# API Gateway — Dockerfile (Multi-stage Build)
#
# Stage 1 (builder): Installs dependencies and compiles TypeScript via NestJS CLI
# Stage 2 (production): Copies only dist/ and node_modules for a minimal image
#
# Build: docker build -t fintrack/api-gateway ./backend/api-gateway
# Run:   docker run -p 3000:3000 fintrack/api-gateway
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
EXPOSE 3000
CMD ["node", "dist/main"]
