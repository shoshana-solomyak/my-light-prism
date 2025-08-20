import { type Faker, faker } from "@faker-js/faker";

declare module "@faker-js/faker" {
    interface Faker {
        custom: {
            password: () => string;
        };
    }
}

const SPECIAL_CHARACTERS = ["@", "$", "!", "%", "*", "?", "&"];

faker.custom = {
    /**
     * Generate a fake valid password
     * @returns password
     */
    password(): string {
        const lower = faker.string.alpha(4).toLowerCase();
        const upper = faker.string.alpha(2).toUpperCase();
        const digit = faker.string.numeric(1);
        const special = faker.helpers.arrayElement(SPECIAL_CHARACTERS);

        return faker.helpers.shuffle([lower, upper, digit, special]).join("");
    },
};

export { faker, type Faker };
