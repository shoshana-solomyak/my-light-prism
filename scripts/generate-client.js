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
const template = flag.string("template", "Which client template to create.", {
    short: "t",
    oneOf: ["web", "capacitor", "native"],
    default: "web",
});

const forms = flag.boolean("forms", "Whether to install `@hilma/forms`.", {
    short: "f",
    invertible: true,
});
const reactRouter = flag.boolean(
    "react-router",
    "Whether to install `react-router` and `react-router-dom`.",
    {
        invertible: true,
    },
);

const flags = [
    help,
    version,
    template,
    "Installing dependencies",
    forms,
    reactRouter,
];

const error = flag.parse(argv, flags);

if (help.value) {
    console.log(
        `usage: ${
            scriptName.startsWith(".") ? scriptName : `./${scriptName}`
        } [<options>] <name>`,
    );
    console.log(
        "\nGenerate a new web client for this repository, within the `clients` directory.\n",
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

const deps = ["react", "react-dom"];
const defaultDepsCount = deps.length;
if (forms.value) deps.push("@hilma/forms");
if (reactRouter.value) deps.push("react-router");

const devDeps = [
    "vite",
    "@vitejs/plugin-react",
    "vite-tsconfig-paths",
    "typescript",
    "@types/react",
    "@types/react-dom",
    "sass",
];

const name = argv[0];
const result = await inquirer.prompt(
    [
        { name: "name", message: "What is the client's name?", type: "input" },
        {
            name: "deps",
            message: "Which dependencies should be installed?",
            type: "checkbox",
            choices: [{ name: "@hilma/forms" }, { name: "react-router" }],
        },
    ],
    {
        name,
        deps: deps.length > defaultDepsCount ? deps : undefined,
    },
);

const templateDir = path.join(__dirname, "templates", template.value);
const targetDir = path.join(__dirname, "..", "clients", result.name);

async function write(file, content) {
    const targetPath = path.join(targetDir, file);
    if (content) {
        await fs.writeFile(targetPath, content);
    } else {
        await copy(path.join(templateDir, file), targetPath);
    }
}

await fs.mkdir(targetDir);
const files = await fs.readdir(templateDir);
await Promise.all(
    files.filter((file) => file !== "package.json").map((file) => write(file)),
);

const validPackageName = toValidPackageName(result.name);

const pkg = JSON.parse(
    await fs.readFile(path.join(templateDir, `package.json`), "utf-8"),
);

pkg.name = `client-${validPackageName}`;

if (pkg.dependencies["@hilma/tools"]) result.deps.push("@hilma/tools");
for (const dep of result.deps) {
    pkg.dependencies[dep] = await getLatestVersion(dep);
}
for (const devDep of devDeps) {
    pkg.devDependencies[devDep] = await getLatestVersion(devDep);
}

await write("package.json", JSON.stringify(pkg, null, 2) + "\n");
await write(
    "README.md",
    [
        `# ${result.name}`,
        "",
        "This is one of the clients generated from using a `hilma-template` script.",
        "Edit this file to provide more information about this client to newcomers.",
        "",
        "You can generate more clients with `scripts/generate-client.js`",
        "",
    ].join("\n"),
);

console.log("\nCreated a new client. Now run:");
console.log(chalk.bold.yellow("  pnpm install"));
console.log("From the project root");
