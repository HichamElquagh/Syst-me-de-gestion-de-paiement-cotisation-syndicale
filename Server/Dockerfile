# Use an official Node.js runtime as a parent image
FROM node:18.18.0

# Set the working directory in the container
WORKDIR /backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all project files to the container
COPY . .
# Expose a port that the application will listen on
EXPOSE 3001

# Define the command to run your application
CMD ["npm","run","dev"]
