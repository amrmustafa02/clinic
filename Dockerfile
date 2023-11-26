FROM node:20.5.1 as build
RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/

COPY . /app/

RUN npm install

RUN npm run build --prod


# second stage
FROM nginx:alpine

COPY --from=build /app/dist/clinic-reservation  /usr/share/nginx/html
