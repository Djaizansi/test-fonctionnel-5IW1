FROM node:16-alpine3.11

# this is a development Dockerfile
# and is not intended for production use
RUN apk --no-cache add pkgconfig autoconf automake libtool nasm build-base zlib-dev libpng-dev git python3

WORKDIR /app

RUN yarn global add sequelize-cli

COPY package.json /app
COPY yarn.lock /app

RUN yarn install


COPY . /app

CMD ["yarn", "start:dev"]

EXPOSE 3000
