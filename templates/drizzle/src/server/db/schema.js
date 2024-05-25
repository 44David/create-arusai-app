"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.createTable = void 0;
var drizzle_orm_1 = require("drizzle-orm");
var pg_core_1 = require("drizzle-orm/pg-core");
exports.createTable = (0, pg_core_1.pgTableCreator)(function (name) { return "arusai-app-".concat(name); });
exports.Post = (0, exports.createTable)("Post", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    post_description: (0, pg_core_1.text)("description"),
    userId: (0, pg_core_1.varchar)("userId", { length: 256 }),
    createdAt: (0, pg_core_1.timestamp)("create_at")
        .default((0, drizzle_orm_1.sql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["CURRENT_TIMESTAMP"], ["CURRENT_TIMESTAMP"]))))
        .notNull(),
});
var templateObject_1;
