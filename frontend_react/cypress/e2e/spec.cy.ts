describe("home page spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000");
  });
});

describe("check login", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("1234");
    cy.get('button[name="submit"]').click();
  });
});

describe("check add list entry", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('input[name="email"]').type("user@example.com");
    cy.get('input[name="password"]').type("1234");
    cy.get('button[name="submit"]').click();
    cy.get('a[id="linkToList"]').click();
    cy.get('button[id="add"]').click();
    cy.get('textarea[id="title"]').type("E2E Test with Cypress");
    cy.get('textarea[id="text"]').type(
      "This is a list entry created by an E2E test with cypress."
    );
    cy.get("#priority-select").click();
    cy.get('li[role="option"]').contains("Medium").click();
    cy.get("#priority-select").should("contain", "Medium");
    cy.get('button[id="submit"]').click();
  });
});
