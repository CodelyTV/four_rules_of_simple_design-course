module.exports = {
	testMatch: ["**/tests/**/*.test.ts", "**/*.test.ts"],
	transform: {
		"\\.ts$": "@swc/jest",
	},
};
