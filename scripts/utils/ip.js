import os from "os";

export function ipAddr() {
    return Object.values(os.networkInterfaces())
        .flat()
        .find(({ family, internal }) => family === "IPv4" && !internal).address;
}
