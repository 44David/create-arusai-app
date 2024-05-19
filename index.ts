const { Command } = require('commander');
import * as p from '@clack/prompts';
import { execSync } from 'child_process';
import * as path from 'path';
import chalk from 'chalk'
import fs from 'fs-extra'

interface CliStructure {
    appName: string;
    packages: string[],   
}

const defaultCliStructure: CliStructure =  {
    appName: "My--App",
    packages: ["dotenv", "typescript", "eslint"],
}

const templateFiles = async(projectDirectory: string, options:
    {
        useClerk: boolean,
        useDrizzle: boolean, 
        useFirebase: boolean,
        usePostgresql: boolean,
    }
) => {
    const baseTemplate = path.join(__dirname, 'templates', 'base');
    await fs.copy(baseTemplate, projectDirectory);

    if (options.useClerk) {
        const clerkTemplate = path.join(__dirname, 'templates', 'clerk')
        await fs.copy(clerkTemplate, projectDirectory);
    }
    if (options.useDrizzle) {
        const drizzleTemplate = path.join(__dirname, 'templates', 'drizzle')
        await fs.copy(drizzleTemplate, projectDirectory);
    }
    if (options.useFirebase) {
        const firebaseTemplate = path.join(__dirname, 'templates', 'firebase')
        await fs.copy(firebaseTemplate, projectDirectory);
    }
    if (options.usePostgresql) {
        const postgresqlTemplate = path.join(__dirname, 'templates', 'postgresql')
        await fs.copy(postgresqlTemplate, projectDirectory);
    }
}

export const Cli = async (): Promise<CliStructure> => {

    const program = new Command();    
        program
            .version("1.0.0")
            .description("Creates a robust web app template using modern web technologies.")
            .action(async () => {
                console.log(chalk.red.bgWhite.bold("Create  App"))
                const project = await p.group(
                    {
                        name: () => 
                            p.text({
                                message: "Project Name: ",
                                defaultValue: "My-Arusai-App",
                            }), 

                        framework: () => {
                            return p.select({
                                message: "What framework will you use? (Use arrow keys)",
                                options: [
                                    { value: "nextjs", label: "NextJS (Web Applications)" },
                                    { value: "none", label: chalk.whiteBright.bgBlueBright(" WORK IN PROGRESS ") + " Expo (Mobile Applications)" },
                                ],
                                initialValue: "nextjs"
                            })
                        },

                        authentication: () => {
                            return p.select({
                                message: "What authentication will you use? (Use arrow keys)",
                                options: [
                                    { value: "none", label: "None" },
                                    { value: "clerk-auth", label: "Clerk Authentication" }
                                ],
                                initialValue: "none"
                            });
                        },

                        database: () => {
                            return p.select({
                                message: "What database/backend will you use? (Use arrow keys)",
                                options: [
                                    { value: "none", label: "None" },
                                    { value: "postgresql", label: "Vercel Postgresql" },
                                    { value: "firebase", label: "Firebase" },
                                ],
                                initialValue: "none"
                            })
                        },

                            databaseORM: ({ results }) => {
                            if (results.database === "firebase" || results.database === "none") return;
                            return p.select({
                                message: "What database ORM will you use? (Use arrow keys)",
                                options: [
                                    { value: "none", label: "None" },
                                    { value: "drizzle", label: "Drizzle ORM" },
                                ],
                                initialValue: "none"
                            })
                        },
                    }
                )
                
                const projectDirectory = path.resolve(process.cwd(), project.name)

                const packages: string[] = [];
                if (project.authentication === "clerk-auth") packages.push("@clerk/nextjs@5.0.1");

                if (project.database === "firebase") packages.push("firebase-tools@latest");
                if (project.database === "postgresql") packages.push("postgres@3.4.4", "pg", "@vercel/postgres");

                if (project.databaseORM === "drizzle") packages.push("drizzle-kit", "drizzle-orm");

                if (project.name) packages.push("next", "dotenv", "typescript", "eslint");
                

                if (project.framework === "nextjs") execSync(`npx create-next-app@14.2.2 ${project.name} --ts`, {stdio: 'inherit'})

                process.chdir(projectDirectory)

                if (packages.length > 0) {
                    execSync(`npm install ${packages.join(' ')} --legacy-peer-deps`, { cwd: projectDirectory, stdio: 'inherit'})
                }

                await templateFiles(projectDirectory, {
                    useClerk: project.authentication === "clerk-auth",
                    useDrizzle: project.databaseORM === "drizzle",
                    useFirebase: project.database === "firebase",
                    usePostgresql: project.database === "postgresql",
                })

                return {
                    appName: project.name,            
                    packages,
                }
        });

    await program.parseAsync(process.argv)

    return defaultCliStructure


};       

if (require.main === module) {
    Cli().then(() => {
        console.log(chalk.green('Success! Arusai Create App ran successfully'))
        console.log(chalk.blueBright('Run `npm run dev` to run your local development server'))
    }).catch((err) => {
        console.error('Error creating project: ', err)
    })
}



