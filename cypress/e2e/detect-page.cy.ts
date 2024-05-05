describe('Detect Page', () => {
  it(`
  GIVEN detect page
  WHEN the user visits the detect page upload one image, then another image and then clicks on the download button
  THEN downloads a zip file with the results
  `, () => {
    cy.viewport(800, 800);

    cy.visit('http://localhost:3000');
    cy.intercept('POST', '/images/detect')
      .as('detectImage');

    cy.get('.dropzone').selectFile([
      'cypress/fixtures/test.jpg',
    ], {
      action: 'drag-drop',
    });

    cy.get('.preloader')
      .should('exist');

    cy.get('.image-slider')
      .should('not.exist');

    cy.wait('@detectImage', { requestTimeout: 40000 });

    cy.get('.preloader')
      .should('not.exist');

    cy.get('.image-slider')
      .should('exist');

    cy.get('.action-bar__add-button').click();

    cy.get('.dropzone').selectFile([
      'cypress/fixtures/test.jpg',
    ], {
      action: 'drag-drop',
    });

    cy.wait('@detectImage', { requestTimeout: 40000 });

    cy.get('.image-slider')
      .should('exist');

    cy.contains('Скачать').click();

    cy.readFile('cypress/downloads/results.zip');
  });
});
