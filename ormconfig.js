const {entityPath, migrationPath} = require('./ormpathconfig');
module.exports = {
    "type": "mysql",
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "synchronize": process.env.TESTING_MODE === "true",
    "dropSchema": process.env.TESTING_MODE === "true",
    "logging": false,
    "entities": entityPath,
    "migrations": migrationPath,
    "subscribers": [
        "src/subscriber/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    },
}
