FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY backend /usr/src/app/backend
COPY dbs /usr/src/app/dbs
COPY package.json /usr/src/app/
COPY run-api.sh /usr/src/app/

RUN chmod +x run-api.sh

RUN npm install

EXPOSE 8080

ENV NODE_ENV=production
ENV LISTENPORT=8080

ENTRYPOINT ["./run-api.sh"]