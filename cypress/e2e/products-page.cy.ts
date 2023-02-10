describe('product-page', () => {
	it('first test', () => {
		cy.login();
		cy.getByData('products-link').click();
		cy.intercept('https://fakestoreapi.com/products').as('getUsers');
		cy.location('pathname').should('eq', '/products');
		cy.wait('@getUsers').then((response) => {
			if (response.response.statusCode !== 200) {
				const err = new Error();
				err.message = 'Can not get products';
				throw err;
			}
		});
	});
});
