This task was built
using [Express](https://github.com/expressjs/express) [TypeScript](https://github.com/microsoft/TypeScript) [Typeorm](https://github.com/typeorm/typeorm)

# Steps to run The project

- renaming .env.example to .env
- run : npm install
- run : npm run migration:run
- run : npm run dev

# Docker

- renaming .env.example to .env
- replace the value of .env/DB_HOST to mysqldb
- replace the value of .env/TS_NODE to false
- run : docker-compose up --build
- to access node container run : docker exec -it trufla-node-api sh
- run : npm run migration:run

# Base Url

- local is  : http://localhost:4000
- heroku is : https://trufla-node.herokuapp.com

# API

- for API [documentation](https://documenter.getpostman.com/view/5140236/TzRUA6U9) that contains examples for success,
  failures and the data model endpoints

# Testing

- run : npm run test

