import axios from "axios";

export function toValidPackageName(str) {
    return str
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/^[._]/, "")
        .replace(/[^a-z\d\-~]+/g, "-");
}

export async function getLatestVersion(packageName) {
    const { data } = await axios.get(
        `https://registry.npmjs.org/${packageName}/latest`,
    );
    return `^${data.version}`;
}
