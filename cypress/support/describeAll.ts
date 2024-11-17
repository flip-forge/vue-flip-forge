export default function describeAll(title: string, fn: () => void) {
  for (const url of [
    "/model",
    "/no-model",
    "/from-dist",
    "/with-svg",
    "/with-svg-portrait",
    "/with-low-res",
  ]) {
    describe(`${title} (${url})`, () => {
      beforeEach(() => {
        cy.visit(url);
      });

      fn();
    });
  }
}
