import type { CreateAdmin } from "@internal/types";

import { faker } from "../support/setup-faker";

const SEND_CODE_ENDPOINT = "/api/auth/login/send-code";
const CONFIRM_CODE_ENDPOINT = "/api/auth/login/confirm-code";
const DEV_CONFIRMATION_CODE = "111111";

describe("Test admin login", () => {
    let admin: CreateAdmin;

    before(() => {
        cy.createAdmin().then((createdAdmin) => {
            admin = createdAdmin;
        });
    });

    beforeEach(() => {
        cy.visit("login");
    });

    it("should login", () => {
        cy.intercept({
            method: "POST",
            url: SEND_CODE_ENDPOINT,
        }).as("sendCode");

        cy.get("body").should("be.visible");
        cy.getByDataCy("login-username").should("be.visible").type(admin.email);
        cy.getByDataCy("login-password").type(admin.password);
        cy.getByDataCy("login-submit-button").click();

        cy.wait("@sendCode").its("response.statusCode").should("eq", 201);

        cy.getByDataCy("login-code").type(DEV_CONFIRMATION_CODE);
        cy.intercept({
            method: "POST",
            url: CONFIRM_CODE_ENDPOINT,
        }).as("confirmCode");

        cy.getByDataCy("code-submit-button").click();

        cy.wait("@confirmCode").its("response.statusCode").should("eq", 201);

        cy.location("pathname").should("eq", "/patients");
    });

    it("should fail to login with incorrect password", () => {
        // TODO randomize
        const wrongPassword = faker.custom.password();
        cy.intercept({
            method: "POST",
            url: SEND_CODE_ENDPOINT,
        }).as("login");
        cy.getByDataCy("login-username").type(admin.email);
        cy.getByDataCy("login-password").type(wrongPassword);
        cy.getByDataCy("login-submit-button").click();

        cy.wait("@login").then((interception) => {
            expect(interception.response.statusCode).to.equal(401);
        });

        // TODO tests for client side errors (no data in inputs)
    });

    it("should fail to login with incorrect code", () => {
        const wrongCode = faker.number.int({ min: 100000, max: 999999 });
        cy.intercept({
            method: "POST",
            url: SEND_CODE_ENDPOINT,
        }).as("sendCode");
        cy.getByDataCy("login-username").type(admin.email);
        cy.getByDataCy("login-password").type(admin.password);
        cy.getByDataCy("login-submit-button").click();

        cy.wait("@sendCode").then((interception) => {
            expect(interception.response.statusCode).to.equal(201);
        });
        cy.getByDataCy("login-code").type(String(wrongCode));
        cy.intercept({
            method: "POST",
            url: CONFIRM_CODE_ENDPOINT,
        }).as("confirmCode");

        cy.getByDataCy("code-submit-button").click();

        cy.wait("@confirmCode").its("response.statusCode").should("eq", 401);
    });
});
