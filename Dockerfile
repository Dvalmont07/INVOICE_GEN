FROM node:lts-alpine as node-angular
ENV NODE_ENV=development
WORKDIR /app
COPY package.json   /app
RUN npm install --force
COPY . .
RUN npm run build

FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node-angular app/dist/invoice-gen /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
