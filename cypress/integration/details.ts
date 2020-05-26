/// <reference types="Cypress" />

import { dataTestId, hexToRgb } from 'helpers';
import Quadrants from '../fixtures/quadrants.json';

describe('Details', () => {
  const quadrantsData = Quadrants.quadrants;
  describe('when link is incorrect', () => {
    it('redirects to not found page if quadrant param is invalid', function() {
      cy.visit('/invalid-quadrant-param/Alpine');
      cy.url().should('include', '/not-found');
    });

    it('redirects to not found page if quadrant param is invalid', function() {
      cy.visit('/platforms-infra-and-data/invalid-technology');
      cy.url().should('include', '/not-found');
    });
  });

  describe('when link is correct', () => {
    beforeEach(() => {
      cy.visit('/Apache/2');
    });

    it('renders page elements', () => {
      dataTestId(' details-skeleton').should('be.visible');

      dataTestId('details-back-link')
        .should('be.visible')
        .should('have.text', 'Platforms, Infrastructure & Data');

      dataTestId(' details-content-title')
        .should('be.visible')
        .should('have.text', 'Timeline: Apache');

      dataTestId('details-timeline-container')
        .should('be.visible')
        .should(
          'have.css',
          'border-left',
          `4px solid ${hexToRgb(quadrantsData[2].color)}`,
        );
      dataTestId('details-timeline-item-0')
        .should('be.visible')
        .get('h3')
        .should('contain.text', 'Apache')
        .parent()
        .get('p')
        .should('contain.text', 'In NL voorkeur Nginx');
    });
  });
});
