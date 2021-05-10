# Steps to run The project
- renaming .env.example to .env
- run npm install
- replace the value of DB_HOST to localhost
- run npm run migration:run


# Docker
- run docker-compose up --build
- the local base url is http://localhost:4000/api/v1/
- to access node container run docker exec -it trufla-node-api sh
- run npm run migration:run
