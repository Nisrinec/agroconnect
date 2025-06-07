# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build the NestJS app
RUN npm run build

# Expose internal port
EXPOSE 3000

# Start the app
CMD ["node", "dist/main"]
