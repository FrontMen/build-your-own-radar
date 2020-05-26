/// <reference types="Cypress" />

import { dataTestId, hexToRgb } from 'helpers';
import Quadrants from '../fixtures/quadrants.json';

describe('Home', () => {
  const quadrantsData = Quadrants.quadrants;
  beforeEach(() => {
    //go to home page
    cy.visit('/');
  });

  it('renders page skeleton when request is in progress', () => {
    dataTestId('home-skeleton').should('be.visible');
  });

  it('renders page elements', () => {
    dataTestId('home-intro').should('be.visible');

    dataTestId('home-intro-title')
      .should('be.visible')
      .contains('About');

    dataTestId('home-intro-content').should('be.visible');

    dataTestId('graph')
      .should('be.visible')
      .should('have.attr', 'viewBox', '0 0 800 800');
  });

  quadrantsData.forEach((quadrant: Quadrant, i: number) => {
    it(`renders quadrant ${i} and redirects to proper quadrant on link click`, () => {
      dataTestId(`home-quadrant-${i}-container`).should('be.visible');

      dataTestId(`home-quadrant-${i}-link`)
        .contains('overview')
        .click();

      cy.url().should('include', `/quadrant/${quadrant.order}`);
    });
  });

  quadrantsData.forEach((quadrant, i) => {
    it(`highlights quadrant on ${i} on hover and redirects to proper page on click`, () => {
      dataTestId('graph')
        .wait(500)
        .get(`[data-testid=quadrant-${i}]`)
        .should('have.css', 'opacity', '0')
        .trigger('mouseover', 'center');

      quadrantsData
        .map((_, index) => index)
        .filter(index => i !== index)
        .forEach(otherQuadrantIndex => {
          dataTestId('graph')
            .get(`[data-testid=quadrant-${otherQuadrantIndex}]`)
            .should('have.css', 'opacity', '0.3');
        });

      dataTestId(`quadrant-${i}`).click();
      cy.url().should(
        'include',
        `/quadrant/${quadrantsData[(2 + i) % 4].order}`,
      );
    });
  });

  quadrantsData.forEach((quadrant, i) => {
    it(`shows quadrant ${i} tooltip on hover`, () => {
      dataTestId('graph')
        .get(`[data-testid=quadrant-${i}]`)
        .trigger('mouseover', 'center');

      dataTestId(`graph-tooltip`)
        .should('be.visible')
        .should(
          'have.css',
          'background-color',
          hexToRgb(quadrantsData[(2 + i) % 4].color),
        );
    });
  });
});
