describe('category-page test', () => {
	it('test', () => {
		cy.login();
		cy.getByData('categories-link').click();
		cy.intercept('https://fakestoreapi.com/products/categories').as(
			'getCategories',
		);
		cy.location('pathname').should('eq', '/categories');
		cy.wait('@getCategories').then(() => {});
	});
});
