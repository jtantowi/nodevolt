# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:20.16.0

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install ci "--production=false" --legacy-peer-deps

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "npm", "run", "dev" ]
