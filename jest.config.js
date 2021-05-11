require("dotenv").config();

module.exports = {
    "roots": [
        process.env.TS_NODE === "true" ? "<rootDir>/src" : "<rootDir>/dist"
    ],
    "testMatch": [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "preset": 'ts-jest',
    "testEnvironment": 'node',
    "setupFilesAfterEnv": [
        process.env.TS_NODE === "true" ? "./src/test/setup.ts" : "./dist/test/setup.js"
    ]
}
