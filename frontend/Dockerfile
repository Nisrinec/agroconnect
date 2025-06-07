FROM node:18-alpine

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Optional: Use nginx for static hosting
FROM nginx:alpine
COPY --from=0 /app/dist/frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
