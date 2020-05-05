// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (type = "user") => {
    const users = {
        user: {
            email: "user@example.com",
            password: "Password123@",
        },
        facilityowner: {
            email: "owner@example.com",
            password: "Password123@",
        },
    };

    const user = users[type];
    cy.request({
        method: "POST",
        url: `${Cypress.config().apiUrl}/auth/login`,
        body: user,
    }).then((resp) => {
        localStorage.setItem("stay_access_token", resp.body.access_token);
    });
});
