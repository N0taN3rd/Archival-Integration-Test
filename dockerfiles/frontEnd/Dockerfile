FROM node:8.5.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY backend /usr/src/app/backend
COPY public /usr/src/app/public
COPY pug /usr/src/app/pug
COPY package.json /usr/src/app/
COPY run-backend.sh /usr/src/app/

RUN chmod +x run-backend.sh

RUN npm install

ENV NODE_ENV=production
ENV LISTENPORT=8080
ENV FRONT_END_DOMAIN="localhost"
ENV FRONT_END_LOC="http://localhost:8090"
ENV API_ENDPOINT="http://localhost:8091"

EXPOSE 8080

ENTRYPOINT ["./run-backend.sh"]
