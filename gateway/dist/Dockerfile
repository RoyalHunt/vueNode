FROM node:8-alpine

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app
COPY package.json /usr/src/app/

RUN npm install --unsafe-perm

COPY . /usr/src/app

CMD sh -c 'if  [ "$NODE_ENV" =  "production" ]; \
  then \
  npm run build && \
  npm start; \
  else \
  npm run dev; \
  fi'

EXPOSE 8080
