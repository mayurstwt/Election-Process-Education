# Build stage
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add a script to inject environment variables at runtime
WORKDIR /usr/share/nginx/html
RUN echo 'window.APP_CONFIG = { VITE_GEMINI_API_KEY: "$VITE_GEMINI_API_KEY" };' > config.js.template

# Use a shell script to replace the variable and start Nginx
CMD ["/bin/sh", "-c", "envsubst < config.js.template > config.js && nginx -g 'daemon off;'"]
