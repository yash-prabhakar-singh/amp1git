FROM node:19-alpine3.16 as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install

COPY . .
#RUN rm -rf node_modules && yarn
RUN export NODE_OPTIONS="--max-old-space-size=8192"
#RUN node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'
RUN npm run build

FROM nginx:1.21.5-alpine
COPY --chown=nginx:nginx nginx-ui.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx --from=builder /app/build /var/www/html/