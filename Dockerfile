# Use a Node.js base image
FROM node:14-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Node.js image for serving the React app
FROM node:14-alpine as production

# Set the working directory in the container
WORKDIR /app

# Copy the build files from the previous stageh
COPY --from=build /app/build ./build

# Install serve to run the production server
RUN npm install -g serve

# Expose port 3000 to the outside world
EXPOSE 3000

# Run the production server
CMD ["serve", "-s", "build"]
