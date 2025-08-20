/// <reference types="cypress" />
import type { CreateAdmin } from "@internal/types";

import { faker } from "./setup-faker";

// -----------------
// Type Declarations
// -----------------
declare global {
    export namespace Cypress {
        interface Chainable {
            login(): Chainable;
            createAdmin(): Chainable<CreateAdmin>;
            getByDataCy(dataCy: string): Chainable<JQuery>;
            clearDatabase(): Chainable;
        }
    }
}

// -----------
// JS Commands
// -----------

const PHONE_NUMBER_REGEX = "05[0-9]{8}";

Cypress.Commands.add("getByDataCy", (dataCy) => cy.get(`[data-cy="${dataCy}"]`));
Cypress.Commands.add("createAdmin", () => {
    const admin = {
        email: faker.internet.email(),
        password: faker.custom.password(),
        phoneNumber: faker.helpers.fromRegExp(PHONE_NUMBER_REGEX),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
    };

    const center = {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        phoneNumber: faker.helpers.fromRegExp(PHONE_NUMBER_REGEX),
    };

    cy.request({
        method: "POST",
        url: "/api/test/create-admin",
        body: {
            admin,
            center,
        },
    }).then((res) => {
        expect(res.status).to.eq(201);
        return admin;
    });
});
Cypress.Commands.add("login", () => {
    cy.createAdmin().then((admin) => {
        /**
         * TODO: implement login with the new admin data.
         * Don't use the UI to login, this method will slow the tests. Instead, send login requests directly to the server.
         */
    });
});
Cypress.Commands.add("clearDatabase", () => {
    cy.request({
        method: "POST",
        url: "/api/test/db/clear",
    }).then((res) => {
        expect(res.status).to.be.within(200, 299);
    });
});

export {};
