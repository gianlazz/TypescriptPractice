FROM node:8.11-stretch

RUN apt-get update

ENV NODE_ENV docker
ENV PORT 80

EXPOSE 80

WORKDIR /usr/src/node-app

COPY package.json package.json

# Python is needed for node-canvas


RUN npm install

COPY . .

CMD ["npm", "run build"]

CMD ["npm", "start"]