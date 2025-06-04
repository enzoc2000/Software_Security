# Build stage
FROM node:22.16.0-alpine3.22 AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Production image
FROM node:22.16.0-alpine3.22
WORKDIR /app
COPY --from=builder /app/public public
COPY --from=builder /app/package.json .
COPY --from=builder /app/vite.config.ts .
COPY --from=builder /app/tsconfig.tsbuildinfo .
COPY --from=builder /app/index.html .
RUN npm install --omit=dev

EXPOSE 5173
CMD ["vite", "preview", "--host", "--port", "5173"]