# Build Stage
FROM node:latest AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build/ /usr/share/nginx/html
WORKDIR /app

# Change the owner of the files to the nginx user
RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
# Create the pid file (used by nginx to manage the process)
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid
# Switch to the nginx user, so that the container does not run as root
USER nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]