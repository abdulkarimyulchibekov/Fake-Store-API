describe('product-page', () => {
  before(() => {
    cy.intercept('/products').as('getProducts');
  });

  it('first test', () => {
    cy.login();
    cy.getByData('products-link').click();
    cy.wait('@getProducts', { timeout: 10000 }).then(() => {
      cy.location('pathname').should('eq', '/products');
      cy.get(':nth-child(1) > :nth-child(3) > [data-test="product-item"]', {
        timeout: 10000
      })
        .should('exist')
        .click({ force: true });
    });
  });
});
