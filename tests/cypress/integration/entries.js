/* eslint-disable */

describe('Entries', function() {
  it('.should be able to be added through the form', function() {
    cy.visit('http://localhost:3000/apply');

    // Click the button
    cy.get('form #3').click();
    cy.get('form button[type="submit"]').click();

    cy.get('form #name').type('Codebuddy');
    cy.get('form #oneLineIntro').type('I am a codebuddy from an automated test');
    cy.get('form #lookingFor').type('I am looking for people who help me get better at what I do.');
    cy.get('form button[type="submit"]').click();

    cy.get('form #email').type('codebuddy@codebuddies.org');
    cy.get('form #timezone').select('12');
    cy.get('form button[type="submit"]').click();
  });
});
