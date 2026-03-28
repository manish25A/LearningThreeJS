# Use a slim Node image to keep it fast
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package.json yarn.lock* ./
RUN yarn install

# Copy the rest of the files
COPY . .

# Expose the port Webpack is using
EXPOSE 5000

# Start the dev server
CMD ["yarn", "run", "dev"]