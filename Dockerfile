FROM node:17.4-alpine3.14 as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install

COPY . .
#RUN rm -rf node_modules && yarn
RUN npm run build

FROM nginx:1.21.5-alpine
COPY --chown=nginx:nginx nginx-ui.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=builder /app/build /var/www/html/