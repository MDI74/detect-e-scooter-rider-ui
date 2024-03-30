import HomePage from '.';

describe('Home Page', () => {
  it(`
  GIVEN home page
  WHEN upload one image and click by send button
  THEN calls an api request to detect an object in the image
  `, () => {
    mountComponent();
    cy.intercept('POST', 'http://localhost:8000/detect-image', {})
      .as('sendImage');

    cy.get('.dropzone').selectFile([
      'cypress/fixtures/test.jpg',
    ], {
      action: 'drag-drop',
    });

    cy.get('.image-slider')
      .should('not.exist');

    cy.wait('@sendImage');

    cy.get('.image-slider')
      .should('exist');
  });
});

function mountComponent() {
  cy.mount(
    <HomePage />,
  );
}
