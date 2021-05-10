const entitySrcConfig =
    [
        "src/entity/**/*.ts"
    ];


const entityDistConfig =
    [
        "dist/entity/*.js"
    ];

const migrationSrcConfig =
    [
        "src/migration/**/*.ts"
    ];


const migrationDistConfig =
    [
        "dist/migration/*.js"
    ];


const entityPath = process.env.TS_NODE === "true" ? entitySrcConfig : entityDistConfig;
const migrationPath = process.env.TS_NODE === "true" ? migrationSrcConfig : migrationDistConfig;
module.exports = {entityPath, migrationPath};
