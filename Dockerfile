# Use a lighter version of Node as a parent image
FROM node:18-slim

# A directory within the virtualized Docker environment
WORKDIR /server
 
# Copies package.json
COPY package.json ./

# Copies yarn.lock
COPY yarn.lock ./

# Installs all node packages
RUN yarn install/node_modules
 
# Copies everything over to Docker environment
COPY . .

# Builds application
RUN yarn build

# Finally runs the application
CMD [ "yarn", "start" ]