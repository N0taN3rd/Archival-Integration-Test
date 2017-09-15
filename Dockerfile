FROM node:8.5.0
LABEL maintainer="John Berlin <n0tan3rd@gmail.com>"

EXPOSE 8080
WORKDIR /app

ENV NODE_ENV=production \
    LISTENPORT=8080 \
    OUT_SIDE_DOCKER_PORT=8880 \
    FRONT_END_DOMAIN="localhost" \
    FRONT_END_LOC="http://localhost:8080" \
    API_ENDPOINT="http://localhost:8880"

COPY package.json /app/package.json

RUN npm install

COPY . /app

CMD ["node", "--harmony", "backend/index.js"]