# Use an official Node.js runtime as a parent image
FROM node:18.18.0

# Set the working directory in the container
WORKDIR /Client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all project files to the container
COPY . .

# Define the command to run your application
CMD ["npm","run","dev"]
