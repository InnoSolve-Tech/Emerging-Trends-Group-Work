# Backend Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the backend files
COPY . .

# Expose the port your backend service listens on (e.g., 4000)
EXPOSE 4000

# Define the command to run the app
CMD ["npm", "server"]
