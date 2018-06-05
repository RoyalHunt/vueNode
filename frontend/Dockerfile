FROM node:8-alpine

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app
COPY package.json /usr/src/app/

RUN npm install --unsafe-perm

COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]
