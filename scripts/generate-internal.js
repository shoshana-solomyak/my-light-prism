#!/usr/bin/env node
import chalk from "chalk";
import fs from "fs/promises";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";

import { flag } from "./utils/flaglib.js";
import { copy } from "./utils/fs.js";
import { getLatestVersion, toValidPackageName } from "./utils/packages.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cwd = process.cwd();
const scriptName = path.relative(cwd, process.argv[1]);
const argv = process.argv.slice(2);

const help = flag.boolean("help", "Print this help information and exit.", {
    short: "h",
    urgent: true,
});
const version = flag.boolean("version", "Print version information and exit.", {
    short: "V",
    urgent: true,
});

const flags = [help, version];

const error = flag.parse(argv, flags);

if (help.value) {
    console.log(
        `usage: ${
            scriptName.startsWith(".") ? scriptName : `./${scriptName}`
        } [<options>] <name>`,
    );
    console.log(
        "\nGenerate a new internal package for this repository, within the `internal` directory.\n",
    );
    console.log("Options");
    console.log(flag.info(flags, { prefix: 4 }));
    process.exit(0);
}

if (version.value) {
    const packageJson = await fs.readFile(path.join(__dirname, "package.json"));
    console.log(`${scriptName} - v${JSON.parse(packageJson).version}`);
    process.exit(0);
}

if (error) {
    console.error(error);
    process.exit(1);
}

const name = argv[0];
const result = await inquirer.prompt(
    [{ name: "name", message: "What is the package's name?", type: "input" }],
    {
        name,
    },
);
const internalTemplateDir = path.join(__dirname, "internal-template");
const targetDir = path.join(__dirname, "..", "internal", result.name);

async function write(file, content) {
    const targetPath = path.join(targetDir, file);
    if (content) {
        await fs.writeFile(targetPath, content);
    } else {
        await copy(path.join(internalTemplateDir, file), targetPath);
    }
}

await fs.mkdir(targetDir);
const files = await fs.readdir(internalTemplateDir);
await Promise.all(
    files.filter((file) => file !== "package.json").map((file) => write(file)),
);

const validPackageName = toValidPackageName(result.name);
const pkg = JSON.parse(
    await fs.readFile(path.join(internalTemplateDir, `package.json`), "utf-8"),
);

pkg.name = `@internal/${validPackageName}`;
for (const dep of Object.keys(pkg.dependencies || {})) {
    pkg.dependencies[dep] = await getLatestVersion(dep);
}
for (const devDep of Object.keys(pkg.devDependencies || {})) {
    pkg.devDependencies[devDep] = await getLatestVersion(devDep);
}
await write("package.json", JSON.stringify(pkg, null, 2) + "\n");

await write("README.md", [`# Internal Package - ${result.name}`, ""].join("\n"));

console.log("\nCreated a new internal package. Add:");
console.log(chalk.bold.yellow(`  \"${pkg.name}\": \"workspace:*\"`));
console.log(
    "To the `dependencies` field of any of the other packages in this workspace, and run:",
);
console.log(chalk.bold.yellow(`  pnpm install`));
