describe('category-page test', () => {
	before(() => {
		cy.intercept('https://fakestoreapi.com/products/categories').as(
			'getCategories',
		);
	});

	it('test', () => {
		cy.login();
		cy.getByData('categories-link').click();
		cy.wait('@getCategories', { timeout: 10000 }).then(() => {
			cy.location('pathname').should('eq', '/categories');
			cy.get(':nth-child(1) > .item__link')
				.should('exist')
				.click({ force: true });
		});
	});
});
