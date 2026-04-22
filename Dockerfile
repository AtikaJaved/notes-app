# ── Stage: Production ──────────────────────────────────────
# Optimization 1: Use lightweight Alpine image (reduces size from ~900MB → ~180MB)
FROM node:18-alpine

# Optimization 2: Set working directory (keeps layers clean)
WORKDIR /app

# Optimization 3: Copy package files FIRST (Docker layer caching)
# If code changes but dependencies don't, this layer is reused → faster builds
COPY package*.json ./

# Install only production dependencies (no devDependencies)
RUN npm install --omit=dev

# Copy rest of the application files
COPY . .

# Expose the app port
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]