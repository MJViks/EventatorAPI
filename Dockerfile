FROM node:12

WORKDIR /usr/src/Eventator

ARG MSSQL_HOST

COPY ./package*.json ./
COPY ./dist ./dist
COPY ./appConfig.json ./
RUN  apt-get update & apt-get upgrade & npm install

EXPOSE 8080

CMD sleep 15 && npm start