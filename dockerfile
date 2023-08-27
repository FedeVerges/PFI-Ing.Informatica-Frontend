# Node server
FROM node:18
RUN mkdir -p /home/app
WORKDIR /home/app
COPY . /home/app
EXPOSE 4200
RUN npm install
CMD [ "npm","run", "host"]
