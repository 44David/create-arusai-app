const { Command } = require('commander');
import * as p from '@clack/prompts';
import { execSync } from 'child_process';

interface CliStructure {
    appName: string;
    packages: string[],   
}

const defaultCliStructure: CliStructure =  {
    appName: "My-App",
    packages: [],
}

export const Cli = async (): Promise<CliStructure> => {

    const program = new Command();    
        program
            .version("1.0.0")
            .description("Creates a robust web app template using modern web technologies.")
            .argument('<project-directory>', 'Directory of Project')
            .action(async (projectDirectory: string) => {
                const project = await p.group(
                    {
                        name: () => 
                            p.text({
                                message: "Project Name: ",
                                defaultValue: projectDirectory || "My-App",
                            }), 

                        authentication: () => {
                            return p.select({
                                message: "What authentication will you use?",
                                options: [
                                    { value: "none", label: "None" },
                                    { value: "clerk-auth", label: "Clerk Authentication" }
                                ],
                                initialValue: "none"
                            });
                        },

                        database: () => {
                            return p.select({
                                message: "What database/backend will you use?",
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
                                message: "What database ORM will you use?",
                                options: [
                                    { value: "none", label: "None" },
                                    { value: "drizzle", label: "Drizzle ORM (Recommended)" },
                                    { value: "prisma", label: "Prisma ORM" },
                                ],
                                initialValue: "none"
                            })
                        },
                    }
                )

                const packages: string[] = [];
                if (project.authentication === "clerk-auth") packages.push("@clerk/nextjs");

                if (project.database === "firebase") packages.push("firebase-tools@latest");
                if (project.database === "postgresql") packages.push("postgres", "pg", "@vercel/postgres");

                if (project.databaseORM === "drizzle") packages.push("drizzle-kit", "drizzle-orm");
                if (project.databaseORM === "prisma") packages.push("prisma");
                
                execSync(`mkdir ${projectDirectory}`, {stdio: 'inherit'})

                execSync('npm init -y', { cwd: projectDirectory, stdio: 'inherit'});

                if (packages.length > 0) {
                    execSync(`npm install ${packages.join(' ')}`, { cwd: projectDirectory, stdio: 'inherit'})
                }

                return {
                    appName: project.name,            
                    packages,
                }
        });

    await program.parseAsync(process.argv)

    return defaultCliStructure


};       

if (require.main === module) {
    Cli().then((structure) => {
        console.log('Success', structure)
    }).catch((err) => {
        console.error('Error creating project: ', err)
    })
}



