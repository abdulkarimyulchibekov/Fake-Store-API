describe('category-page test', () => {
	it('test', () => {
		cy.login();
		cy.getByData('categories-link').click();
		cy.intercept('https://fakestoreapi.com/products/categories').as(
			'getCategories',
		);
		cy.wait('@getCategories', { timeout: 10000 }).then(() => {
			cy.location('pathname').should('eq', '/categories');
			cy.get(':nth-child(1) > .item__link')
				.should('exist')
				.click({ force: true });
		});
	});
});
