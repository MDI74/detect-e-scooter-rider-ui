import { ErrorDialog } from './ErrorDialog';

describe('ErrorDialog', () => {
  it(`
    GIVEN ErrorDialog component
    WHEN errorMessage is null
    THEN ErrorDialog is not visible
    `, () => {
    mountComponent({
      errorMessage: null,
    });

    cy.get('.error-dialog')
      .should('not.exist');
  });

  it(`
  GIVEN ErrorDialog component
  WHEN errorMessage not null and user click by close button
  THEN ErrorDialog is visible
  `, () => {
    mountComponent({
      errorMessage: 'Расширения файла должно быть png или jpg',
    });

    cy.get('.error-dialog')
      .should('exist');

    cy.get('.error-dialog__button').click();

    cy.get('.error-dialog')
      .should('not.exist');
  });

  it(`
  GIVEN ErrorDialog component
  WHEN errorMessage not null
  THEN ErrorDialog is visible
  `, () => {
    mountComponent({
      errorMessage: 'Расширения файла должно быть png или jpg',
    });

    cy.get('.error-dialog')
      .should('exist');

    cy.contains('Расширения файла должно быть png или jpg');
  });
});

function mountComponent({
  errorMessage,
}: {
  errorMessage: string | null;
}) {
  cy.mount(
    <ErrorDialog message={errorMessage} />,
  );
}
