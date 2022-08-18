FROM node:16.14.2 as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY src ./src
COPY public ./public
COPY .eslintrc.js ./
RUN npm run build

FROM nginx

RUN mkdir /app
COPY --from=build /usr/src/app/dist /app
COPY build/nginx.conf /etc/nginx/nginx.conf
