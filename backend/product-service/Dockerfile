# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (to cache dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of your app source code
COPY . .

# No build step needed since you run plain JS

# Start the app with index.js
CMD ["node", "index.js"]
