# Build stage
FROM node:22.16.0-alpine3.22 AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Production image
FROM node:22.16.0-alpine3.22
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
RUN npm install --omit=dev
EXPOSE 3010
CMD ["node", "dist/Config/index.js"]
