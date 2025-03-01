FROM node:20.11.1-alpine3.19 AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.25.4-alpine3.18
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /var/www/html/
EXPOSE 3000
ENTRYPOINT ["nginx","-g","daemon off;"]