FROM node:lts AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . .

# Build the application
RUN ng build --configuration=production

FROM nginx:latest
# Copy the nginx configuration
COPY ./nginx.conf /etc/nginx/nginx.conf


# Copy the build output - adjust this path based on the output from the debug commands above
COPY --from=build /app/dist/cook-book-front/browser /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
