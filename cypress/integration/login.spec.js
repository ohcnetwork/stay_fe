describe("Login page", () => {
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

    beforeEach(() => {
        cy.visit("/login");
    });

    it("Greets with sign in", () => {
        cy.get("h2").contains("Sign in");
    });

    it("Auto focus email input", () => {
        cy.focused().should("have.attr", "name", "email");
    });

    it("Has link to user register", () => {
        cy.get("a")
            .contains("Register")
            .should("have.attr", "href", "/user-register");
    });

    it("Has link to forgot password", () => {
        cy.get("a")
            .contains("Forgot Password")
            .should("have.attr", "href", "/forgot-password");
    });

    it("Requires email", () => {
        cy.get("button[type=submit]").click();
        cy.get("form").contains("Email / Password is empty");
    });

    it("Requires password", () => {
        cy.get("input[name=email]").type(`${users.user.email}{enter}`);
        cy.get("form").contains("Email / Password is empty");
    });

    it("Requires valid username and password", () => {
        cy.get("input[name=email]").type(`${users.user.email}{enter}`);
        cy.get("input[name=password]").type("invalid{enter}");
        cy.get("form").contains("Check your email and password");
    });

    it("Shows message on login error", () => {
        cy.server();
        cy.route({
            url: `${Cypress.config().apiUrl}/auth/login`,
            method: "POST",
            status: 500,
            response: {},
        });
        const { email, password } = users.user;
        cy.get("input[name=email]").type(`${email}`);
        cy.get("input[name=password]").type(`${password}{enter}`);
        cy.contains("Something went Wrong");
    });

    context("Successful login", () => {
        it("Navigates to search page: user", () => {
            const { email, password } = users.user;
            cy.get("input[name=email]").type(`${email}`);
            cy.get("input[name=password]").type(`${password}{enter}`);
            cy.url().should("eq", `${Cypress.config().baseUrl}/`);
            cy.contains("Stay Quarantined, Fight Corona");
        });

        it("Navigates to admin dashboard: facility owner", () => {
            const { email, password } = users.facilityowner;
            cy.get("input[name=email]").type(`${email}`);
            cy.get("input[name=password]").type(`${password}{enter}`);
            cy.url().should("eq", `${Cypress.config().baseUrl}/`);
            cy.contains("facilityowner");
        });
    });
});
