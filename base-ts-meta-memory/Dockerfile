# Build stage
FROM node:16-alpine as builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++ git

# Copy package files
COPY package*.json ./

# Install all dependencies and build tools
RUN npm install
RUN npm install -g rollup typescript tsx

# Copy source code
COPY . .

# Build the application using build script
RUN npm run build

# Production stage
FROM node:16-alpine

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Set non-root user for security
USER node

# Start the application
CMD ["npm", "start"]