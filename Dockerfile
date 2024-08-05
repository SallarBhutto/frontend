# # Stage 1: Build the React app
# FROM node:16 as build
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . ./

# # Set environment variable with a default value
# ENV REACT_APP_API_BASE_URL=http://localhost:3001

# RUN npm run build

# # Stage 2: Serve the React app using a lightweight web server
# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:16 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
