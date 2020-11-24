FROM node:12
WORKDIR /usr/src/app
COPY ./package*.json ./
COPY ./src/ .
EXPOSE 8080