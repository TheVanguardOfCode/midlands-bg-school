const queryStrings: string[] = ["?lang=en", "?lang=bg"]

describe("URL Query String Test", () => {
  const [en, bg] = queryStrings

  it("should have ?lang=en in the URL", () => {
    cy.visit(en);
    cy.url().should("include", en);
  });

  it("should have ?lang=bg in the URL", () => {
    cy.visit(bg);
    cy.url().should("include", bg);
  });
});
