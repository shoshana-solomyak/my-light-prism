#!/usr/bin/env node
import chalk from "chalk";
import commandExists from "command-exists";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import { execSync } from "./utils/exec.js";
import { flag } from "./utils/flaglib.js";

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
const verbose = flag.boolean("verbose", "Print additional debug information.", {
    short: "v",
});

const platform = flag.string("platform", "Choose platform to build for.", {
    short: "p",
    oneOf: ["ios", "android"],
    argName: "target",
    required: true,
});
const profile = flag.string("profile", "Choose a build profile.", {
    short: "P",
    argName: "profile",
    default: "development",
});

const flags = [help, version, verbose, "Build info", platform, profile];

function usageAndExit() {
    console.log(
        `usage: ${
            scriptName.startsWith(".") ? scriptName : `./${scriptName}`
        } <app path>`,
    );
    console.log("\nBuild an Expo project locally.\n");
    console.log("Positional arguments");
    console.log(
        "    <app path> - the path to the Expo project to build. (required)\n",
    );
    console.log("Options");
    console.log(flag.info(flags, { prefix: 4 }));
    process.exit(0);
}

async function versionAndExit() {
    const packageJson = await fs.readFile(
        path.join(__dirname, "package.json"),
        "utf-8",
    );
    console.log(`${scriptName} - v${JSON.parse(packageJson).version}`);
    process.exit(0);
}

async function errorAndExit(...msgs) {
    msgs.forEach((error) => {
        console.error(`[ ${chalk.red("ERROR")} ] ${chalk.bold(error)}`);
    });
    process.exit(1);
}

const exec = execSync.bind(null, errorAndExit);

function debug(...msgs) {
    if (verbose.value) {
        msgs.forEach((msg) => {
            const prefix = `[ ${chalk.magenta("DEBUG")} ] `;

            console.log(
                msg && typeof msg === "object" && !Array.isArray(msg)
                    ? flag.stringify(msg, prefix, false)
                    : typeof msg === "string"
                      ? prefix + msg
                      : prefix + flag.stringify(msg),
            );
        });
    }
}

const error = flag.parse(argv, flags);
if (help.value) usageAndExit();
if (version.value) await versionAndExit();
if (error) errorAndExit(error);

let app = argv.shift();
if (!app) errorAndExit("missing required positional argument - <app path>");
app = path.join(process.cwd(), app);

debug({ app, platform, profile });

if (!(await commandExists("eas")))
    errorAndExit(
        `missing ${chalk.bold.yellow("eas")} command in path`,
        `run ${chalk.bold.yellow("pnpm install -g eas-cli")}`,
    );

if (platform.value === "android") {
    if (!process.env.ANDROID_HOME)
        errorAndExit(
            `missing ${chalk.bold.green("ANDROID_HOME")} environment variable`,
        );
} else {
    if (!(await commandExists("fastlane")))
        errorAndExit(
            `missing ${chalk.bold.yellow("fastlane")} command in path`,
            `run ${chalk.bold.yellow("brew install fastlane")}`,
            `  (you may have to run ${chalk.yellow("brew uninstall --ignore-dependencies node")} after)`,
        );
}

exec(
    `eas build --local --platform=${platform.value} --profile=${profile.value} --output=build.${platform.value === "android" ? "apk" : "ipa"}`,
    {
        cwd: app,
    },
);
