/// <reference types="Cypress" />

import { dataTestId, hexToRgb } from 'helpers';
import { d3Config } from '../../src/utils/d3-config';

describe('Details', () => {
  describe('when link is incorrect', () => {
    it('redirects to not found page if quadrant param is invalid', function() {
      cy.visit('/invalid-quadrant-param/alpine');
      cy.url().should('include', '/not-found');
    });

    it('redirects to not found page if quadrant param is invalid', function() {
      cy.visit('/platforms-infra-and-data/invalid-technology');
      cy.url().should('include', '/not-found');
    });
  });

  describe('when link is correct', () => {
    beforeEach(() => {
      cy.visit('/platforms-infra-and-data/apache');
    });

    it('renders page elements', () => {
      dataTestId(' details-skeleton').should('be.visible');

      dataTestId('details-back-link')
        .should('be.visible')
        .should('have.text', 'Back to Platforms, infrastructure & Data');

      dataTestId(' details-content-title')
        .should('be.visible')
        .should('have.text', 'Timeline: apache');

      dataTestId('details-timeline-container')
        .should('be.visible')
        .should(
          'have.css',
          'border-left',
          `4px solid ${hexToRgb(d3Config.quadrants[2].color)}`,
        );
      dataTestId('details-timeline-item-0')
        .should('be.visible')
        .should('have.attr', 'value', 'Apr, 2020')
        .get('h3')
        .should('contain.text', 'Apache')
        .parent()
        .get('p')
        .should('contain.text', 'In NL voorkeur Nginx')
    });
  });
});
