describe('product-page', () => {
  before(() => {
    cy.intercept('/carts').as('getCarts');
  });

  it('first test', () => {
    cy.login();
    cy.getByData('carts-link').click();
    cy.wait('@getCarts', { timeout: 10000 }).then(() => {
      cy.location('pathname').should('eq', '/carts');
      cy.get(':nth-child(1) > .item__link').click();
    });
    cy.get(':nth-child(1) > .content > div > .product__link', {
      timeout: 10000
    }).click();
  });
});
