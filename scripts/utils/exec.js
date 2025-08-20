import { execSync as baseExecSync } from "child_process";

/**
 * A slightly nice API for `execSync`.
 *
 * @param {(error: Error) => void} onError callback to be called with an error, in case of one
 * @param {string} command the command to run
 * @param {object} options options for `execSync`
 *
 * @example
 * const exec = execSync.bind(null, (error) => console.log(`ERROR: ${error.message}`));
 *
 * exec("echo 'hi'");
 **/
export function execSync(onError, command, options) {
    try {
        baseExecSync(command, {
            ...options,
            stdio: ["inherit", "inherit", "pipe"],
        });
    } catch (error) {
        onError(error);
    }
}
