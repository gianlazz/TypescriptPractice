FROM node:8.11-alpine

RUN apk update

ENV NODE_ENV production
ENV PORT 80

EXPOSE 80

WORKDIR /usr/src/node-app

COPY package.json package.json

RUN npm install

COPY . .

CMD ["npm", "run buildForDistribution"]

CMD ["npm", "start"]