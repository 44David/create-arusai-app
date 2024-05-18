const { Command } = require('commander');
import * as p from '@clack/prompts'

interface CliStructure {
    appName: string;
    packages: Packages[],   
}

export const Cli = async () => {

const program = new Command();    
    program
        .version("1.0.0")
        .description("Creates a robust web app template using modern web technologies.")
        .argument()


        const project = await p.group(
            {
                name: () => 
                    p.text({
                        message: "Project Name: ",
                        defaultValue: "Arusai-App",
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
                    if (results.database === "firebase") return;
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

        const packages: Packages[] = [];
        if (project.authentication === "clerk-auth") packages.push("@clerk/nextjs");

        if (project.database === "firebase") packages.push("firebase-tools@latest");
        if (project.database === "postgresql") packages.push("postgres", "pg", "@vercel/postgres");

        if (project.databaseORM === "drizzle") packages.push("drizzle-kit", "drizzle-orm");
        if (project.databaseORM === "prisma") packages.push("prisma");

        return {
            appName: project.name,            
            packages
        }


    return CliStructure
};       




