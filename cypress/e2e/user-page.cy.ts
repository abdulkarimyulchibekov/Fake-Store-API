describe('product page test', () => {
  before(() => {
    cy.intercept('/users').as('getUsers');
  });

  it('product-page', () => {
    cy.login();
    cy.getByData('users-link').click();
    cy.wait('@getUsers', { timeout: 10000 }).then(() => {
      cy.location('pathname').should('eq', '/users');
      cy.get(':nth-child(1) > :nth-child(3) > .table__link', { timeout: 10000 })
        .should('exist')
        .click({ force: true });
    });
  });
});
