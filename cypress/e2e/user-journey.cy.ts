describe('user journey', () => {
	it('the h1 contains correct text', () => {
		cy.login();
		cy.getByData('products-link').click();
		cy.location('pathname').should('eq', '/products');
		cy.getByData('categories-link').click();
		cy.location('pathname').should('eq', '/categories');
		cy.getByData('carts-link').click();
		cy.location('pathname').should('eq', '/carts');
		cy.getByData('users-link').click();
		cy.location('pathname').should('eq', '/users');
		cy.getByData('account-page').click();
		cy.location('pathname').should('eq', '/account');
	});
});
