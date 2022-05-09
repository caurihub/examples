// eslint-disable-next-line no-undef
module.exports = {
	testEnvironment: "node",
	bail: false,
	verbose: true,
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	testMatch: ["**/*.test.ts"],
	collectCoverage: false,
	watchman: false,
	setupFilesAfterEnv: ["jest-extended"],
};
