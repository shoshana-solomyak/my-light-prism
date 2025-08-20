import fc from "fast-check";

export async function setup() {
    fc.configureGlobal({
        numRuns: 10,
        endOnFailure: true,
        verbose: true,
    });
}
