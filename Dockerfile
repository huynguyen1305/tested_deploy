# 1. For build React app
FROM node:16 AS development
# Set working directory
WORKDIR /app
COPY package.json ./package.json
# File copy for health check
COPY healthy /tmp/healthy
# Same as npm install
COPY ./ ./
RUN npm install
RUN npm run build 
# 2. For Nginx setup
FROM nginx:alpine
RUN unlink /var/log/nginx/access.log
RUN unlink /var/log/nginx/error.log
# Copy config nginx
COPY --from=development /app/build/ /var/www/live-api-openapi-frontweb/html/live-api-openapi-frontweb/
COPY --from=development /app/.nginx.conf /etc/nginx/conf.d/default.conf

# File copy for health check
COPY --from=development /tmp/healthy /tmp/healthy
EXPOSE 80
# Containers run nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]
