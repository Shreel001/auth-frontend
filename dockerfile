# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json . 
RUN npm install
COPY . .
RUN npm run build

# Runtime stage (Nginx)
FROM nginx:stable
RUN rm -rf /etc/nginx/conf.d/
COPY --from=build /app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80