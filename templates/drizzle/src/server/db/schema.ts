import { sql } from "drizzle-orm";
import {
    pgTableCreator,
    serial, 
    varchar,
    timestamp,
    text,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `arusai-app-${name}`);

export const Post = createTable (
    "Post",
    {   
        id: serial("id").primaryKey(),
        post_description: text("description"),
        userId: varchar("userId", { length: 256 }),
        createdAt: timestamp("create_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
    },
)
