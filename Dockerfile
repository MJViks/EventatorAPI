FROM node:12

WORKDIR /usr/src/Eventator

ARG MSSQL_HOST
ARG MSSQL_PASS
ARG MSSQL_USER
ARG MSSQL_DB
ARG APP_PORT

COPY ./package*.json ./
COPY ./dist ./dist
COPY ./appConfig.json ./
COPY ./.env ./
RUN  apt-get update & apt-get upgrade & npm install

EXPOSE 8080

CMD sleep 15 && npm start