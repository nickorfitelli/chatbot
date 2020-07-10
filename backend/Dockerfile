# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# install app dependencies
RUN npm install

# add app
COPY . ./app

EXPOSE 3001

# start app
CMD ["node", "backend.js"]