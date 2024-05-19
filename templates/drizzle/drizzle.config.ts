import { defineConfig } from "drizzle-kit";
import { type Config } from "drizzle-kit";
import { env } from "./src/env";


export default defineConfig({
    schema: "./src/server/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
            url: env.POSTGRES_URL,
        },
        tablesFilter: ["next-app-practice_*"],

}) satisfies Config;