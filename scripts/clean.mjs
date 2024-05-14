import { fork, spawn } from "child_process";
import path from "path";


const __filename = path.basename(import.meta.url);

const __dirname = path.dirname(
    import.meta.url.replace(
        'file://',
        ''
    )
);


async function clean () {
    const scripts = [
        `clean/build`,
        `clean/dist`,
        `clean/docs`
    ]

    const tasks = [];

    for (let script of scripts) {
        const scriptPath = `${__dirname}/${script}.mjs`;

        const task = spawn(
            "node",
            [ scriptPath ]
        );

        tasks.push(task);
    }

    for (let task of tasks) {
        const exitCode = await new Promise(
            (resolve, reject) => {
                task.on(
                    "error",
                    error => reject(error.message)
                );

                task.on(
                    "exit",
                    exitCode => resolve(exitCode)
                );
            }
        );

        if (exitCode) {
            console.log("Error: ", exitCode);
            process.exit(exitCode);
        }
    }
}


clean();
