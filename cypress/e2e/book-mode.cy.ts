import describeAll from "../support/describeAll";

describeAll("Test flip forge book", () => {
  it("Check keyboard navigation", () => {
    cy.get(".toolbar").contains("0 / 10");
    cy.get('[data-page="1"]').should("be.visible");
    cy.get("body").type("{rightArrow}");
    cy.get(".toolbar").contains("2 / 10");
    cy.get('[data-page="2"]').should("be.visible");
    cy.get('[data-page="3"]').should("be.visible");

    cy.get("body").type("{rightArrow}");
    cy.get(".toolbar").contains("4 / 10");
    cy.get('[data-page="4"]').should("be.visible");
    cy.get('[data-page="5"]').should("be.visible");

    cy.get("body").type("{leftArrow}");
    cy.get(".toolbar").contains("2 / 10");
    cy.get('[data-page="2"]').should("be.visible");
    cy.get('[data-page="3"]').should("be.visible");

    cy.get("body").type("{esc}");
    cy.get(".toolbar").contains("0 / 10");
    cy.get('[data-page="1"]').should("be.visible");

    cy.get("body").type("{end}");
    cy.get(".toolbar").contains("10 / 10");
    cy.get('[data-page="10"]').should("be.visible");

    cy.get("body").type("{home}");
    cy.get(".toolbar").contains("0 / 10");
    cy.get('[data-page="1"]').should("be.visible");
  });

  it("Check wheel navigation", () => {
    cy.get(".toolbar").contains("0 / 10");
    cy.get('[data-page="1"]').should("be.visible");
    cy.get("body").trigger("wheel", { deltaY: 120 });
    cy.get(".toolbar").contains("2 / 10");
    cy.get('[data-page="2"]').should("be.visible");
    cy.get('[data-page="3"]').should("be.visible");

    cy.get("body").trigger("wheel", { deltaY: 120 });
    cy.get(".toolbar").contains("4 / 10");
    cy.get('[data-page="4"]').should("be.visible");
    cy.get('[data-page="5"]').should("be.visible");

    cy.get("body").trigger("wheel", { deltaY: -120 });
    cy.get(".toolbar").contains("2 / 10");
    cy.get('[data-page="2"]').should("be.visible");
    cy.get('[data-page="3"]').should("be.visible");
  });

  it("Check toolbar navigation", () => {
    cy.get(".toolbar").contains("0 / 10");
    cy.get('[data-page="1"]').should("be.visible");
    cy.get(".toolbar [title='Go forward']").click();
    cy.get(".toolbar").contains("2 / 10");
    cy.get('[data-page="2"]').should("be.visible");
    cy.get('[data-page="3"]').should("be.visible");

    cy.get(".toolbar [title='Go forward']").click();
    cy.get(".toolbar").contains("4 / 10");
    cy.get('[data-page="4"]').should("be.visible");
    cy.get('[data-page="5"]').should("be.visible");

    cy.get(".toolbar [title='Go back']").click();
    cy.get(".toolbar").contains("2 / 10");
    cy.get('[data-page="2"]').should("be.visible");
    cy.get('[data-page="3"]').should("be.visible");

    cy.get(".toolbar [title='Go to start']").click();
    cy.get(".toolbar").contains("0 / 10");
    cy.get('[data-page="1"]').should("be.visible");

    cy.get(".toolbar [title='Go to end']").click();
    cy.get(".toolbar").contains("10 / 10");
    cy.get('[data-page="10"]').should("be.visible");
  });
});
