FROM node:20.5.1 as build
RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/

COPY . /app/

RUN npm install

RUN npm run build --prod


# second stage
FROM nginxinc/nginx-unprivileged:alpine3.18-perl

USER root

RUN touch /tmp/nginx.pid

RUN chmod 777 /tmp/nginx.pid

USER nginx

COPY --from=build /app/dist/test-docker-1  /usr/share/nginx/html

ARG API_URL
RUN sed -i "s|$API_URL|${API_URL}|g" /var/www/html/main*.js
