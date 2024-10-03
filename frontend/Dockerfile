# Frontend Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Expose port and define the entry point
EXPOSE 3000
CMD ["npm", "start"]
