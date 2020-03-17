/// <reference types="Cypress" />

import { dataTestId, hexToRgb } from 'helpers';
import { d3Config } from '../../src/utils/d3-config';
import { lightTheme } from '../../src/Theme';

describe('quadrant', () => {
  beforeEach(() => {
    cy.visit(d3Config.quadrants[0].route);
  });

  describe('sub navigation', () => {
    it('renders subnav', () => {
      dataTestId('subnav-container').should('be.visible');
      dataTestId('subnav-filters-container').should('be.visible');
      dataTestId('subnav-search-container').should('be.visible');
    });

    it('it should redirect me to quadrant page when i click on link, and selected link should have proper color', () => {
      dataTestId(`subnav-link-${0}`).should(
        'have.css',
        'background-color',
        hexToRgb(d3Config.quadrants[0].color),
      );
      d3Config.quadrants.forEach((q, index) => {
        if (index !== 0) {
          dataTestId(`subnav-link-${index}`)
            .should(
              'have.css',
              'background-color',
              hexToRgb(lightTheme.pallet.secondary),
            )
            .click()
            .should(
              'have.css',
              'background-color',
              hexToRgb(q.color),
            );
        }
      });
    });
  });

  describe('radar', () => {

  });
});
