FROM node:12
WORKDIR /usr/src/app
COPY ./src/package*.json ./
RUN npm install