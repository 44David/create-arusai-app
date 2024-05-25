"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var server_1 = require("@clerk/nextjs/server");
var isProtectedRoute = (0, server_1.createRouteMatcher)([
// Add your protected routes here
]);
exports.default = (0, server_1.clerkMiddleware)(function (auth, req) {
    if (isProtectedRoute(req))
        auth().protect();
});
exports.config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
