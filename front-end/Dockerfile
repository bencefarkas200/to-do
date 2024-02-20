FROM node:18 as build-step

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

RUN npm run build


FROM nginx:1.25.3 as serve-step

COPY --from=build-step /app/dist/to_do /usr/share/nginx/html