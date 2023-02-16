describe('account page', () => {
  it('first test', () => {
    cy.login();
    cy.getByData('account-page').should('exist').click({ force: true });
    let submitBtn = cy.getByData('account-submit');
    cy.locationP('/account');
    cy.getByData('account-name').clear().type('qwerty');
    let ageInput = cy.getByData('account-age');
    ageInput.clear().type('-16');
    submitBtn.click();
    cy.get('.form > :nth-child(2) > :nth-child(3)', { timeout: 10000 })
      .should('exist')
      .contains('Ваш возраст не может быть отрицательным числом');
    ageInput.clear().type('17');
    submitBtn.click();
    cy.locationP('/');
    cy.getByData('account-page').should('exist').click({ force: true });
    cy.locationP('/account');
    submitBtn = cy.getByData('account-submit');
    let emailInput = cy.getByData('account-email');
    emailInput.clear().type('abdulkarim@.com');
    submitBtn.click();
    emailInput.clear().type('example@gmail.com');
    submitBtn.click();
    cy.locationP('/');
    cy.getByData('account-page').should('exist').click({ force: true });
    cy.locationP('/account');
  });
});
