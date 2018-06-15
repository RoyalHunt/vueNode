# NodeJs Express with Swagger + VueJs

## Overview

This is REST API project on [`Nodejs`](https://nodejs.org/en/) based on [`Express`](http://expressjs.com/) and [Swagger documentation](https://swagger.io/specification/).

Frontend part based on [VueJs](https://vuejs.org/v2/guide/)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/RoyalHunt/vueNode.git

# Change directory
cd vueNode/docker

# Build containers and run application
sh ./bootstrap.sh
```

Without docker, you should do next steps.

**For develop version:**

```bash
# Enter in to backend folder from root
cd gateway

# Install dependencies
npm install

# Run server
npm run dev
```

_In another terminal window:_

```bash
# Enter in to frontend folder from root
cd frontend

# Install dependencies
npm install

# Run server
npm start
```

## Project Structure

Folders
- [data](https://github.com/RoyalHunt/) - Seeds for MongoDb
- [docker](https://github.com/RoyalHunt/) - env file + docker configation
- [frontend](https://github.com/RoyalHunt/) - Web SPa on VueJs
- [gateway](https://github.com/RoyalHunt/) - Backend NodeJs Express

## MongoDb

You can seed database with data running script file from `docker folder` with next command:

```bash
# Run bash in mongodb container
docker exec -it mongodb bash

# Run script file
sh data/seed/bootstrap.sh
```

Without docker, you should do next steps:

```bash
# Run mongodb
mongod

# Run script file from docker folder
sh data/seed/bootstrap.sh
```

## Swagger

Swagger documentation you could find by the next link:
[`http://localhost:8081/`](http://localhost:8081/)

To generate the Swagger specification, we are using [`swagger-jsdoc`](https://github.com/Surnet/swagger-jsdoc)

## Environment Variables

- NODE_ENV - specifies the environment in which an application is running (default is development)

## Requirements

- [Nodejs](https://nodejs.org/en/)
- [Swagger](https://swagger.io/)
- [Mongodb](https://www.mongodb.com/)
- [Docker](https://docs.docker.com/)
- [VueJs](https://vuejs.org/v2/guide/)
