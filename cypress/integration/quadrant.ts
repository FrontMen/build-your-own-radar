/// <reference types="Cypress" />

import { dataTestId, hexToRgb } from 'helpers';
import { d3Config } from '../../src/utils/d3-config';
import { lightTheme } from '../../src/Theme';

describe('quadrant', () => {
  beforeEach(() => {
    cy.visit(d3Config.quadrants[0].route);
  });

  it('should redirect to not found page if quadrant param in url is invalid ', () => {
    cy.visit('/invalid-quadrant');
    cy.url().should('contain', '/not-found');
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
            .should('have.css', 'background-color', hexToRgb(q.color));
        }
      });
    });
  });

  describe('radar', () => {
    it('renders only one quadrant', () => {
      dataTestId('graph')
        .should('be.visible')
        .should('not.have.attr', 'viewBox', '0 0 800 800');
    });
    it('shows bubble when hover on blip, and highlights tech in list', () => {
      dataTestId('graph')
        .find('.blip')
        .first()
        .trigger('mouseover')
        .then(el => {
          const technologyName = el.attr('data-testid');

          dataTestId('radar-bubble')
            .should('be.visible')
            .find('text')
            .should('contain', technologyName);

          dataTestId(`list-item-${technologyName}`)
            .get('[data-testid=label]')
            .should('contain.text', technologyName)
            .should(
              'have.css',
              'background-color',
              hexToRgb(lightTheme.pallet.blue),
            );
        });
    });

    it('selects a list item when i click on a blip', () => {
      dataTestId('graph')
        .find('.blip')
        .first()
        .then(el => {
          const technologyName = el.attr('data-testid');
          dataTestId(`list-item-${technologyName}`)
            .get('[data-testid=details]')
            .should('be.hidden');
        });

      dataTestId('graph')
        .find('.blip')
        .first()
        .click()
        .then(el => {
          const technologyName = el.attr('data-testid');
          dataTestId(`list-item-${technologyName}`)
            .get('[data-testid=details]')
            .should('be.visible');
        });
    });
  });
});
