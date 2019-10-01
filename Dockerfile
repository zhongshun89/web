FROM node:lts-alpine

RUN mkdir -p /usr/src/web
WORKDIR /usr/src/web

RUN apk update && apk upgrade
RUN apk add git

COPY . /usr/src/web/

RUN npm install

RUN npm run build

EXPOSE 80
