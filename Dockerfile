# Use Node as a parent image
FROM node:18
 
# A directory within the virtualized Docker environment
# Becomes more relevant when using Docker Compose later
WORKDIR /api
 
# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./
 
# Installs all node packages
RUN npm install
 
# Copies everything over to Docker environment
COPY . .

# Build the app
RUN npm run build

# Finally runs the application
CMD [ "npm", "start" ]