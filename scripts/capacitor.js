#!/usr/bin/env node
import chalk from "chalk";
import fs from "fs/promises";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";

import { execSync } from "./utils/exec.js";
import { flag } from "./utils/flaglib.js";
import { ipAddr } from "./utils/ip.js";

const INSTALL_COMMAND = "pnpm install";
const BUILD_COMMAND = "pnpm build";

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
const level = flag.string("level", "Choose what level to build for.", {
    short: "P",
    oneOf: ["debug", "prod"],
    argName: "level",
    default: "debug",
});
const reinstall = flag.boolean(
    "reinstall",
    `Whether \`${INSTALL_COMMAND}\` should be run before building.`,
    {
        invertible: true,
    },
);
const prebuild = flag.boolean(
    "prebuild",
    `Whether \`${BUILD_COMMAND}\` should be run before building.`,
    {
        invertible: true,
    },
);

const format = flag.string("format", "Choose what file format to use", {
    short: "f",
    oneOf: ["apk", "aab"],
    default: "apk",
    argName: "format",
});

const installApk = flag.boolean(
    "install-apk",
    "Install the APK to a connected Android device after building.",
    {
        invertible: true,
    },
);

const openXcode = flag.boolean(
    "open-xcode",
    "Open XCode to the project's workspace after building.",
    {
        invertible: true,
    },
);

const flags = [
    help,
    version,
    verbose,
    "Build info",
    platform,
    level,
    reinstall,
    prebuild,
    "Android options",
    format,
    installApk,
    "iOS options",
    openXcode,
];

function usageAndExit() {
    console.log(
        `usage: ${
            scriptName.startsWith(".") ? scriptName : `./${scriptName}`
        } <app path>`,
    );
    console.log("\nBuild a debug or release result from a Capacitor project.\n");
    console.log("Positional arguments");
    console.log(
        "    <app path> - the path to the Capacitor project to build. (required)\n",
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

function errorAndExit(...msgs) {
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

function print(...msgs) {
    msgs.forEach((msg) => {
        console.log(`[ ${chalk.blue("PRINT")} ] ${msg}`);
    });
}

const error = flag.parse(argv, flags);
if (help.value) usageAndExit();
if (version.value) await versionAndExit();
if (error) errorAndExit(error);

let app = argv.shift();
if (!app) errorAndExit("missing required positional argument - <app path>");
app = path.join(process.cwd(), app);

debug({ app, reinstall, prebuild });

const prefix = `[  ${chalk.cyan("???")}  ]`;

const result = await inquirer.prompt(
    [
        {
            name: "reinstall",
            message: `run \`${INSTALL_COMMAND}\`?`,
            type: "confirm",
            prefix,
        },
        {
            name: "prebuild",
            message: `run \`${BUILD_COMMAND}\`?`,
            type: "confirm",
            prefix,
        },
    ],
    {
        reinstall: reinstall.value ?? undefined,
        prebuild: prebuild.value ?? undefined,
    },
);

if (result.reinstall) {
    print("reinstalling dependencies...");
    exec(INSTALL_COMMAND, {
        cwd: app,
    });
} else {
    print("skipping reinstall");
}

if (result.prebuild) {
    const env = { ...process.env };
    if (level.value === "debug" && !env.VITE_DOMAIN) {
        const domain = `http://${ipAddr()}:8080`;
        debug({ domain });
        env.VITE_DOMAIN = domain;
    }

    print(`building project with \`${BUILD_COMMAND}\`...`);

    exec(BUILD_COMMAND, {
        env,
        cwd: app,
    });
} else {
    print("skipping prebuild");
}

debug({ platform, level });
if (platform.value === "android") {
    print("building for android...");

    exec("npx cap sync android", {
        cwd: app,
    });

    debug({ format });
    let command = "./gradlew";
    if (format.value === "aab") {
        command += " bundle";
    } else {
        command += " assemble";
    }
    if (level.value === "prod") {
        command += "Release";
    } else {
        command += "Debug";
    }
    command += " --parallel";

    if (verbose.value) {
        command += " --console verbose";
    } else {
        command += " --quiet";
    }

    debug({ command });
    exec(command, {
        cwd: path.join(app, "android"),
    });

    if (format.value === "apk") {
        const result = await inquirer.prompt(
            [
                {
                    name: "installApk",
                    type: "confirm",
                    message: "install output to a connected device?",
                    prefix,
                },
            ],
            {
                installApk: installApk.value ?? undefined,
            },
        );

        if (result.installApk) {
            command = "./gradlew install";
            if (level.value === "prod") {
                command += "Release";
            } else {
                command += "Debug";
            }

            if (verbose.value) {
                command += " --console verbose";
            } else {
                command += " --quiet";
            }

            debug({ command });
            exec(command, {
                cwd: path.join(app, "android"),
            });
        }
    }
} else {
    print("building for ios...");

    exec("npx cap sync ios", {
        cwd: app,
    });

    debug({ openXcode });
    const result = await inquirer.prompt(
        [
            {
                name: "openXcode",
                type: "confirm",
                message: "open xcode to the project's workspace?",
                prefix,
            },
        ],
        {
            openXcode: openXcode.value ?? undefined,
        },
    );

    if (result.openXcode) {
        exec("npx cap open ios", {
            cwd: app,
        });
    }
}
