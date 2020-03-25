module.exports = {
    transform: {
        "^.+\\.ts?$": "ts-jest"
    },
    testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(ts?)$",
    moduleFileExtensions: ["ts", "js", "json", "node"],
    collectCoverage: true,
    moduleNameMapper: {
        "@app/(.*)": "<rootDir>/src/$1",
        "@controller/(.*)": "<rootDir>/src/controllers/$1",
        "@middleware/(.*)": "<rootDir>/src/routing/middlewares/$1",
        "@route/(.*)": "<rootDir>/src/routing/routes/$1",
        "@model/(.*)": "<rootDir>/src/models/$1"
    }
};
