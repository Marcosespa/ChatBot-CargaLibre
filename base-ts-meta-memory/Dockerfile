# Build stage
FROM node:18-alpine as builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@8.12.0

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

# Install pnpm and production dependencies only
RUN npm install -g pnpm@8.12.0 && \
    pnpm install --prod

# Set non-root user for security
USER node

# Start the application
CMD ["pnpm", "start"]