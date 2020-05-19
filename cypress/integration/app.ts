/// <reference types="Cypress" />

import { dataTestId } from 'helpers';

describe('App', () => {
  beforeEach(() => cy.generateToken());

  it('render application', function() {
    cy.visit('/');
    //check for app container
    cy.get('.App').should('be.visible');

    //Header
    //home link
    dataTestId('home-link')
      .should('be.visible')
      .contains('Tech Radar');

    //logo
    dataTestId('logo').should('be.visible');

    //Footer
    dataTestId('footer-Frontmen-link').should('be.visible');
    dataTestId('footer-Intracto-link').should('be.visible');
  });

  it('click on title in header should redirect to home page', () => {
    cy.visit('/some-page');
    dataTestId('home-link').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
