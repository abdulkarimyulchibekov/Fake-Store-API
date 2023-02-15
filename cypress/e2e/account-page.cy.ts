describe('account page', () => {
	it('first test', () => {
		cy.login();
		cy.getByData('account-page').should('exist').click({ force: true });
		cy.location('pathname').should('eq', '/account');
		cy.getByData('account-name').clear().type('qwerty');
		cy.getByData('account-age').clear().type('-16');
		cy.getByData('account-submit').click();
		cy.get('.form > :nth-child(2) > :nth-child(3)')
			.should('exist')
			.contains('Ваш возраст не может быть отрицательным числом');
		cy.getByData('account-age').clear().type('17');
		cy.getByData('account-submit').click();
		cy.location('pathname').should('eq', '/');
		cy.getByData('account-page').should('exist').click({ force: true });
		cy.location('pathname').should('eq', '/account');
		cy.getByData('account-email').clear().type('abdulkarim@.com');
		cy.getByData('account-submit').click();
		cy.getByData('account-email').clear().type('example@gmail.com');
		cy.getByData('account-submit').click();
		cy.location('pathname').should('eq', '/');
		cy.getByData('account-page').should('exist').click({ force: true });
		cy.location('pathname').should('eq', '/account');
	});
});