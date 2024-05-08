# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend application
COPY . .

# Build the application
RUN npm run build

# Install a simple server for serving the production build
RUN npm install -g serve

# The port your app will run on
EXPOSE 5173

# Command to serve the application
CMD ["serve", "-s", "dist", "-l", "5173"]
