/// <reference types="Cypress" />

import { dataTestId } from 'helpers';
import { d3Config } from '../../src/utils/d3-config';

describe('Home', () => {
  beforeEach(() => {
    //go to home page
    cy.visit('/');
  });

  it('renders page elements', () => {
    dataTestId('home-title')
      .should('be.visible')
      .contains('Whats this all about?');

    dataTestId('graph')
      .should('be.visible')
      .should('have.attr', 'viewBox', '0 0 800 800');
  });

  d3Config.quadrants.forEach((quadrant, i) => {
    it(`renders quadrant ${i} and redirects to proper quadrant on link click`, () => {
      dataTestId(`quadrant-container-${i}`).should('be.visible');

      dataTestId(`quadrant-container-${i}`)
        .find('h2')
        .contains(quadrant.name);

      dataTestId(`quadrant-container-${i}`)
        .find('a')
        .contains('look at ' + quadrant.name)
        .click();

      cy.url().should('include', `/${quadrant.route}`);
    });
  });

  d3Config.quadrants.forEach((quadrant, i) => {
    it(`highlights quadrant on ${i} on hover and redirects to proper page on click`, () => {
      dataTestId('graph')
        .wait(500)
        .get(`[data-testid=quadrant-${i}]`)
        .should('have.css', 'opacity', '0')
        .trigger('mouseover', 'center');

      d3Config.quadrants
        .map((_, index) => index)
        .filter(index => i !== index)
        .forEach(otherQuadrantIndex => {
          dataTestId('graph')
            .get(`[data-testid=quadrant-${otherQuadrantIndex}]`)
            .should('have.css', 'opacity', '0.3');
        });

      dataTestId(`quadrant-${i}`).click();
      cy.url().should('include', `/${d3Config.quadrants[(2 + i) % 4].route}`);
    });
  });
});
