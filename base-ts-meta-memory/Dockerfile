# Build stage
FROM node:18-alpine as builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies including devDependencies
RUN npm install

# Install rollup globally
RUN npm install -g rollup

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

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