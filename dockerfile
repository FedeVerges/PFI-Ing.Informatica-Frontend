# Node server
FROM node:18.13 as build

# Set the working directory
WORKDIR /home/app/front

# Add the source code to app
COPY ./ /home/app/front

# Install all the dependencies
RUN npm install

RUN npm run build-prod

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /home/app/front/dist/validador-titulos /usr/share/nginx/html

COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80