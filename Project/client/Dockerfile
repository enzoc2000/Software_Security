# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Production image
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/public public
COPY --from=builder /app/package.json .
RUN npm install --omit=dev
EXPOSE 5173
CMD ["npm", "start"]