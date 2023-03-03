# Use a lighter version of Node as a parent image
FROM node:18-slim

# A directory within the virtualized Docker environment
WORKDIR /server
 
# Copies package.json
COPY package.json ./

# Installs all node packages
RUN yarn install
 
# Copies everything over to Docker environment
COPY . .

# Builds application
RUN yarn build

# Finally runs the application
CMD [ "yarn", "start" ]