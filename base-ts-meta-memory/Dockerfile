FROM node:21-alpine3.18

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies and build tools in one layer
RUN apk add --no-cache python3 make g++ git && \
    npm install && \
    npm install -g rollup typescript tsx

# Copy source code
COPY . .

# Build the application
RUN npm run build && \
    npm prune --production

# Start the application
CMD ["npm", "start"]