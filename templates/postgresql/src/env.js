import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv ({
    server: {
        POSTGRES_URL: z.string().url(),
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development")
    }
})