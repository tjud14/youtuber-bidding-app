FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy project files
COPY . .

# Build the app (if needed for production)
# RUN npm run build

# Development stage
FROM node:18-alpine
WORKDIR /app

# Copy dependencies and project files
COPY --from=builder /app /app

# Set environment variable
ENV NODE_ENV=development

# Expose SvelteKit development server port
EXPOSE 5173

# Run SvelteKit development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]