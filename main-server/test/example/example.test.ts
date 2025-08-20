import { expect, test } from "vitest";

import { sum } from "./example.function";

test("1 plus 3 equals 4", () => {
    expect(sum(1, 3)).toBe(4);
});

test("1 plus 2 not equals 4", () => {
    expect(sum(1, 2)).not.toBe(4);
});
