import { readdirSync, statSync } from "fs";
import { join } from "path";

const IGNORE_DIRS = ["node_modules", ".git", "dist", "build"];

/**
 * @param {string} dir
 */
function checkYmlFiles(dir) {
    const files = readdirSync(dir);

    files.forEach((file) => {
        const filePath = join(dir, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
            if (IGNORE_DIRS.includes(file)) {
                return;
            }
            checkYmlFiles(filePath);
        } else if (filePath.endsWith(".yml")) {
            console.error(
                "\x1b[31m",
                "Error: Disallowed .yml file found, use .yaml instead:",
                "\x1b[0m",
                filePath,
            );
            process.exitCode = 1;
        }
    });
}

checkYmlFiles("./");
