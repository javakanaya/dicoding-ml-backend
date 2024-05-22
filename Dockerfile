# Use the official Node.js image.
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install 

# Copy local code to the container image.
COPY . .

RUN npm rebuild @tensorflow/tfjs-node --build-from-source 

# Make port 3000 available to the world outside this container.
EXPOSE 3000

# Run the web service on container startup.
CMD [ "npm", "start" ]
