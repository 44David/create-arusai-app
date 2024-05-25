#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cli = void 0;
var Command = require('commander').Command;
var p = require("@clack/prompts");
var child_process_1 = require("child_process");
var path = require("path");
var chalk = require("chalk");
var fs = require("fs-extra");
var defaultCliStructure = {
    appName: "My-Arusai-App",
    packages: ["dotenv", "typescript", "eslint"],
};
var templateFiles = function (projectDirectory, options) { return __awaiter(void 0, void 0, void 0, function () {
    var baseTemplate, clerkTemplate, drizzleTemplate, firebaseTemplate, postgresqlTemplate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                baseTemplate = path.join(__dirname, 'templates', 'base');
                return [4 /*yield*/, fs.copy(baseTemplate, projectDirectory)];
            case 1:
                _a.sent();
                if (!options.useClerk) return [3 /*break*/, 3];
                clerkTemplate = path.join(__dirname, 'templates', 'clerk');
                return [4 /*yield*/, fs.copy(clerkTemplate, projectDirectory)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (!options.useDrizzle) return [3 /*break*/, 5];
                drizzleTemplate = path.join(__dirname, 'templates', 'drizzle');
                return [4 /*yield*/, fs.copy(drizzleTemplate, projectDirectory)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                if (!options.useFirebase) return [3 /*break*/, 7];
                firebaseTemplate = path.join(__dirname, 'templates', 'firebase');
                return [4 /*yield*/, fs.copy(firebaseTemplate, projectDirectory)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                if (!options.usePostgresql) return [3 /*break*/, 9];
                postgresqlTemplate = path.join(__dirname, '../templates', 'postgresql');
                return [4 /*yield*/, fs.copy(postgresqlTemplate, projectDirectory)];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); };
var Cli = function () { return __awaiter(void 0, void 0, void 0, function () {
    var program;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                program = new Command();
                program
                    .version("1.0.0")
                    .description("Creates a robust web app template using modern web technologies.")
                    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var project, projectDirectory, packages;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log(chalk.red.bgWhite.bold("Create Arusai App"));
                                return [4 /*yield*/, p.group({
                                        name: function () {
                                            return p.text({
                                                message: "Project Name (No capital letters): ",
                                                defaultValue: "My-Arusai-App",
                                            });
                                        },
                                        framework: function () {
                                            return p.select({
                                                message: "What framework will you use? (Use arrow keys)",
                                                options: [
                                                    { value: "nextjs", label: "NextJS (Web Applications)" },
                                                    { value: "none", label: chalk.whiteBright.bgBlueBright(" WORK IN PROGRESS ") + " Expo (Mobile Applications)" },
                                                ],
                                                initialValue: "nextjs"
                                            });
                                        },
                                        // shadcnui: () => {
                                        //     return p.select({
                                        //         message: "Will you use shadcn UI components?",
                                        //         options: [
                                        //             { value: "shadcnui", label: "Yes"},
                                        //             { value: "none", label: "No" }
                                        //         ],
                                        //         initialValue: "none"
                                        //     })
                                        // },
                                        authentication: function () {
                                            return p.select({
                                                message: "What authentication will you use? (Use arrow keys)",
                                                options: [
                                                    { value: "clerk-auth", label: "Clerk Authentication" },
                                                    { value: "firebase-auth", label: "Firebase Authentication" },
                                                    { value: "none", label: "None" },
                                                ],
                                                initialValue: "clerk-auth"
                                            });
                                        },
                                        database: function () {
                                            return p.select({
                                                message: "What database/backend will you use? (Use arrow keys)",
                                                options: [
                                                    { value: "postgresql", label: "Vercel Postgresql" },
                                                    { value: "firebase", label: "Firebase" },
                                                    { value: "none", label: "None" },
                                                ],
                                                initialValue: "postgresql"
                                            });
                                        },
                                        databaseORM: function (_a) {
                                            var results = _a.results;
                                            if (results.database === "firebase" || results.database === "none")
                                                return;
                                            return p.select({
                                                message: "What database ORM will you use? (Use arrow keys)",
                                                options: [
                                                    { value: "drizzle", label: "Drizzle ORM (Recommended if using postgresql)" },
                                                    { value: "none", label: "None" },
                                                ],
                                                initialValue: "drizzle"
                                            });
                                        },
                                    })];
                            case 1:
                                project = _a.sent();
                                projectDirectory = path.resolve(process.cwd(), project.name);
                                packages = [];
                                if (project.authentication === "clerk-auth")
                                    packages.push("@clerk/nextjs@5.0.1");
                                if (project.database === "firebase" || project.authentication === "firebase-auth")
                                    packages.push("firebase-tools@latest");
                                if (project.database === "postgresql")
                                    packages.push("postgres@3.4.4", "pg", "@vercel/postgres");
                                if (project.databaseORM === "drizzle")
                                    packages.push("drizzle-kit", "drizzle-orm");
                                if (project.name)
                                    packages.push("dotenv", "typescript", "eslint", "zod");
                                if (project.framework === "nextjs")
                                    (0, child_process_1.execSync)("npx create-next-app@14.2.2 ".concat(project.name, " --ts --eslint --app --src-dir --tailwind --import-alias=@/*"), { stdio: 'inherit' });
                                // if (project.shadcnui === "shadcnui") await execSync ("npx shadcn-ui@latest init", {stdio: 'inherit'});
                                // if (project.shadcnui === "shadcnui") execSync ("npx shadcn-ui@latest add button carousel calendar card alert", {stdio: 'inherit'});
                                process.chdir(projectDirectory);
                                if (packages.length > 0) {
                                    (0, child_process_1.execSync)("npm install ".concat(packages.join(' '), " --legacy-peer-deps"), { cwd: projectDirectory, stdio: 'inherit' });
                                }
                                return [4 /*yield*/, templateFiles(projectDirectory, {
                                        useClerk: project.authentication === "clerk-auth",
                                        useDrizzle: project.databaseORM === "drizzle",
                                        useFirebase: project.database === "firebase",
                                        usePostgresql: project.database === "postgresql",
                                        // useShadcnui: project.shadcnui === "shadcnui",
                                    })];
                            case 2:
                                _a.sent();
                                console.log(chalk.green('Success!') + ' Arusai Create App built successfully!');
                                console.log(chalk.blueBright("type: cd ".concat(project.name, " and run \"npm run dev\" to start you local development server")));
                                if (project.database === "firebase")
                                    console.log("Learn more about NextJS and firebase here: " + chalk.cyanBright.underline.bold("https://firebase.google.com/codelabs/firebase-nextjs#0"));
                                if (project.database === "postgresql" && project.databaseORM === "drizzle")
                                    console.log("Learn more about Postgresql and DrizzleORM here: " + chalk.cyanBright.underline.bold("https://vercel.com/docs/storage/vercel-postgres/using-an-orm#drizzle"));
                                return [2 /*return*/, {
                                        appName: project.name,
                                        packages: packages,
                                    }];
                        }
                    });
                }); });
                return [4 /*yield*/, program.parseAsync(process.argv)];
            case 1:
                _a.sent();
                return [2 /*return*/, defaultCliStructure];
        }
    });
}); };
exports.Cli = Cli;
if (require.main === module) {
    (0, exports.Cli)().then(function () {
    }).catch(function (err) {
        console.error('Error creating project: ', err);
    });
}
