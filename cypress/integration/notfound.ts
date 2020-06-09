/// <reference types="Cypress" />

import { dataTestId } from 'helpers';

describe('Not Found', () => {
  beforeEach(() => {
    cy.visit('/some-invalid-page');
  });

  it('should contain 404 status code as text', function() {
    dataTestId('not-found-content')
      .should('be.visible')
      .contains('404');
  });

  it('should contain a working back home link', () => {
    dataTestId('not-found-link').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
