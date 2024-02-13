FROM node:latest as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

CMD [ "ng","build" ]


FROM nginx:1.25.3

COPY --from=build-step /app/dist/to_do /usr/share/nginx/html