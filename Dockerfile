FROM node:20.8.0-alpine

WORKDIR /app

COPY . . 

# install server dependencies
WORKDIR /app/server
RUN npm install

# run client build
WORKDIR /app/client
RUN npm install
RUN npm run build

# run server
WORKDIR /app/server
CMD ["node", "server.js"]
