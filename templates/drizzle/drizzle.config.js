"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drizzle_kit_1 = require("drizzle-kit");
var env_1 = require("./src/env");
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: "./src/server/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: env_1.env.POSTGRES_URL,
    },
    tablesFilter: ["next-app-practice_*"],
});
