/// <reference types="cypress" />

Cypress.Commands.add('getByData', (selector) => {
	return cy.get(`[data-test='${selector}']`);
});

Cypress.Commands.add('login', () => {
	cy.visit('http://localhost:3000');
	let submitBtn = cy.getByData('submit-btn');
	cy.getByData('input-name').type('Abdulkarim');
	submitBtn.click({ force: true });
	cy.getByData('input-phone').type('998903372882');
	submitBtn.click({ force: true });
	cy.get(':nth-child(3) > span')
		.should('exist')
		.contains('Этот раздел является обязательным');
	cy.getByData('input-email').type('abdulkarim@gfdsfgds');
	submitBtn.click();
	cy.get(':nth-child(3) > span')
		.should('exist')
		.contains('Введите действительный адрес электронной почты');
	cy.getByData('input-email').clear().type('abdulkarimyulchibekov@gamil.com');
	submitBtn.click();
	cy.get(':nth-child(4) > span')
		.should('exist')
		.contains('Этот раздел является обязательным');
	cy.getByData('input-age').type('12');
	submitBtn.click();
});
