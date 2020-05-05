describe("User profile page", () => {
    beforeEach(() => {
        cy.login("user");
        cy.visit("/profile");
    });

    it("Has booking history link", () => {
        cy.contains("Booking history").should("have.attr", "href", "/history");
    });
});
