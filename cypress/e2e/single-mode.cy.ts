import describeAll from "../support/describeAll";

describeAll("Test flip forge book", () => {
  beforeEach(() => {
    cy.viewport(414, 768);
  });

  it("Check wheel navigation", () => {
    cy.get(".toolbar").contains("1 / 10");
    cy.get('[data-page="1"]').should("be.visible");
    cy.get("body").trigger("wheel", { deltaY: 120 });
    cy.get(".toolbar").contains("2 / 10");
    cy.get('[data-page="2"]').should("be.visible");

    cy.get("body").trigger("wheel", { deltaY: 120 });
    cy.get(".toolbar").contains("3 / 10");
    cy.get('[data-page="3"]').should("be.visible");

    cy.get("body").trigger("wheel", { deltaY: -120 });
    cy.get(".toolbar").contains("2 / 10");
    cy.get('[data-page="2"]').should("be.visible");
  });

  it("Check toolbar navigation", () => {
    cy.get(".toolbar").contains("1 / 10");
    cy.get('[data-page="1"]').should("be.visible");
    cy.get(".toolbar [title='Go forward']").click();
    cy.get(".toolbar").contains("2 / 10");
    cy.get('[data-page="2"]').should("be.visible");

    cy.get(".toolbar [title='Go forward']").click();
    cy.get(".toolbar").contains("3 / 10");
    cy.get('[data-page="3"]').should("be.visible");

    cy.get(".toolbar [title='Go back']").click();
    cy.get(".toolbar").contains("2 / 10");
    cy.get('[data-page="2"]').should("be.visible");

    cy.get(".toolbar [title='Go to start']").click();
    cy.get(".toolbar").contains("1 / 10");
    cy.get('[data-page="1"]').should("be.visible");

    cy.get(".toolbar [title='Go to end']").click();
    cy.get(".toolbar").contains("10 / 10");
    cy.get('[data-page="10"]').should("be.visible");
  });

  it("Check scrolling navigation", () => {
    cy.get(".toolbar").contains("1 / 10");
    cy.get('[data-page="1"]').should("be.visible");
    cy.get('[data-page="2"]').scrollIntoView();
    cy.get(".toolbar").contains("2 / 10");
    cy.get('[data-page="2"]').should("be.visible");

    cy.get('[data-page="5"]').scrollIntoView();
    cy.get(".toolbar").contains("5 / 10");
    cy.get('[data-page="5"]').should("be.visible");

    cy.get('[data-page="2"]').scrollIntoView();
    cy.get(".toolbar").contains("2 / 10");
    cy.get('[data-page="2"]').should("be.visible");

    cy.get('[data-page="1"]').scrollIntoView();
    cy.get(".toolbar").contains("1 / 10");
    cy.get('[data-page="1"]').should("be.visible");

    cy.get('[data-page="10"]').scrollIntoView();
    cy.get(".toolbar").contains("10 / 10");
    cy.get('[data-page="10"]').should("be.visible");
  });
});
