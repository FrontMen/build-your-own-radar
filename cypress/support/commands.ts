declare namespace Cypress {
  interface Chainable<Subject> {
    generateToken(): Cypress.Chainable<void>;
  }
}

Cypress.Commands.add('generateToken', () => {
  localStorage.setItem('jwtToken', `test-token`);
});
