/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
		getByData(selector: string): Chainable;
		login(): Chainable;
		locationP(path: string): Chainable;
	}
}
