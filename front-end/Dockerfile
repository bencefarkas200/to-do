FROM node:18 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

RUN npm run build


FROM nginx:1.25.3 as serve-step

COPY --from=build-step /app/dist/to_do /usr/share/nginx/html