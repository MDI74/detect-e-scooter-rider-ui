import { Header } from './Header';

describe('Header', () => {
  it(`
  GIVEN main page
  WHEN visit main page
  THEN render header component
  `, () => {
    mountComponent();
    cy.get('.header')
      .should('exist');

    cy.get('.header__wrapper')
      .should('exist');

    cy.get('.header__title')
      .should('have.text', 'E-SCOOTER RIDER DETECTOR');
  });
});

function mountComponent() {
  cy.mount(
    <Header />,
  );
}
