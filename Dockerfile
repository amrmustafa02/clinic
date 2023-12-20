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

COPY --chown=nginx:nginx nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx:nginx --from=build /app/dist/clinic-reservation /var/www/html/

ARG API_URL
RUN find /usr/share/nginx/html -type f -name 'main*.js' -exec sed -i "s|\$API_URL|${API_URL}|g" {} +

USER nginx

COPY --from=build /app/dist/clinic-reservation  /usr/share/nginx/html

