# Use a lighter version of Node as a parent image
FROM node:18

# A directory within the virtualized Docker environment
WORKDIR /server
 
# Copies package.json
COPY package.json ./

# Installs all node packages
RUN yarn install
 
# Copies everything over to Docker environment
COPY . .

# Build the app
RUN yarn run build

# Finally runs the application
CMD [ "yarn", "start" ]