/// <reference types="Cypress" />

import { dataTestId, hexToRgb } from 'helpers';
import { d3Config } from '../../src/utils/d3-config';
import { lightTheme } from '../../src/Theme';
import { COMPANY_NAMES } from '../../src/components/FilterByCompany/config';

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

    describe('filters', () => {
      it('renders checkbox for each company with correct name and it is clickable', () => {
        Object.entries(COMPANY_NAMES).forEach(([key, name]) => {
          dataTestId(key)
            .should('contain.text', name)
            .find('[data-testid=checkbox]')
            .children()
            .should('exist')
            .parent()
            .click()
            .children()
            .should('not.exist');
        });
      });

      it('should filter out elements in list if i uncheck a checkbox', () => {
        //first waiting till data will be loaded
        dataTestId('graph')
          .find('.blip')
          .then(blips => {
            dataTestId('checkbox')
              .first()
              .click();

            dataTestId('graph')
              .find('.blip')
              .should(v => {
                expect(v.length)
                  .to.be.greaterThan(0)
                  .and.to.be.lessThan(blips.length);
              });
          });
      });

      it("doesn't render list if non of checkboxes checked, and graph should be empty", () => {
        dataTestId('quadrant-no-content').should('not.exist');

        Object.keys(COMPANY_NAMES).forEach(key => {
          dataTestId(key)
            .find('[data-testid=checkbox]')
            .click();
        });
        dataTestId('graph')
          .find('.blip')
          .should('have.length', 0);

        dataTestId('tech-lists').should('not.exist');

        dataTestId('quadrant-no-content')
          .should('exist')
          .and('contain.text', 'You have no datasets selected');
      });

      it('should render DataSet filter', () => {
        dataTestId('dataSetFilter-container').should('be.visible');
        dataTestId('dataSetFilter-anchor')
          .should('be.visible')
          .find('svg')
          .should('be.visible');
        dataTestId('dataSetFilter-text').should('be.visible');
      });

      it('opens DataSet dropdown when i click on it', () => {
        dataTestId('dataSetFilter-dropdown').should('not.exist');
        dataTestId('dataSetFilter-anchor').click();
        dataTestId('dataSetFilter-dropdown').should('be.visible');
      });

      it('selects a DataSet filter item when i click on it', () => {
        //open dropdown
        dataTestId('dataSetFilter-anchor').click();

        //check initial state
        cy.get(`[data-testid^=dataSetFilter-dropdown-option]`)
          .first()
          .should('be.visible')
          .should(
            'have.css',
            'background-color',
            hexToRgb(lightTheme.pallet.primary),
          );

        cy.get(`[data-testid^=dataSetFilter-dropdown-option]`)
          .last()
          .should('be.visible')
          .should(
            'have.css',
            'background-color',
            hexToRgb(lightTheme.pallet.white),
          )
          .click(); // select another item

        //open dropdown again
        dataTestId('dataSetFilter-anchor').click();

        //check changed state
        cy.get(`[data-testid^=dataSetFilter-dropdown-option]`)
          .first()
          .should(
            'have.css',
            'background-color',
            hexToRgb(lightTheme.pallet.white),
          );

        cy.get(`[data-testid^=dataSetFilter-dropdown-option]`)
          .last()
          .should('be.visible')
          .should(
            'have.css',
            'background-color',
            hexToRgb(lightTheme.pallet.primary),
          );
      });
    });

    describe('search', () => {
      it('renders correctly in initial state', () => {
        dataTestId('search-input')
          .should('have.value', '')
          .and('have.attr', 'placeholder', 'Search...');

        dataTestId('search-icon').should('exist');

        dataTestId('search-content').should('not.exist');
      });

      it('should search technologies by name', () => {
        const searchString = 'Ang';
        const gibberish = '$%^&*(#)@@!';

        dataTestId('search-input').type(searchString);

        dataTestId('search-content').should('exist');

        dataTestId('search-technology')
          .first()
          .should('exist')
          .and('contain.text', searchString);

        dataTestId('search-input').type(gibberish);

        dataTestId('search-content').should('not.exist');
      });

      it('should select an element in list when i click on item in dropdown, and close dropdown', () => {
        dataTestId('search-input').type('react');

        dataTestId('search-technology')
          .first()
          .click()
          .then(el => {
            dataTestId(`list-item-${el.text()}`)
              .find('[data-testid=label]')
              .should(
                'have.css',
                'background-color',
                hexToRgb(lightTheme.pallet.blue),
              );
          });

        dataTestId('search-content').should('not.exist');
      });
    });
  });

  describe('radar', () => {
    it('renders only one quadrant', () => {
      dataTestId('graph')
        .should('be.visible')
        .should('not.have.attr', 'viewBox', '0 0 800 800');
    });

    it('shows bubble when hover on blip and highlights tech in list', () => {
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
            .find('[data-testid=label]')
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
            .find('[data-testid=details]')
            .should('be.hidden');
        });

      dataTestId('graph')
        .find('.blip')
        .first()
        .click()
        .then(el => {
          const technologyName = el.attr('data-testid');
          dataTestId(`list-item-${technologyName}`)
            .find('[data-testid=details]')
            .should('be.visible');
        });
    });
  });

  describe('technologies list', () => {
    it('renders content', () => {
      dataTestId('quadrant-content-title')
        .should('exist')
        .and('contain.text', d3Config.quadrants[0].name);

      dataTestId('tech-lists-section').should('exist');

      Object.keys(d3Config.rings).forEach(name => {
        dataTestId(`ring-title-${name}`)
          .should('exist')
          .parent()
          .find('ul')
          .should('exist')
          .find('li')
          .should('have.length.greaterThan', 0);
      });
    });

    it('highlights tech in list and shows bubble when i hover on list item', () => {
      cy.get('[data-testid^=list-item')
        .first()
        .trigger('mouseover')
        .find('[data-testid=label]')
        .should(
          'have.css',
          'background-color',
          hexToRgb(lightTheme.pallet.blue),
        )
        .then(el => {
          dataTestId('radar-bubble')
            .should('have.css', 'opacity', '1')
            .find('text')
            .should('contain', el.text());
        });

      cy.get('[data-testid^=list-item')
        .first()
        .trigger('mouseout')
        .find('[data-testid=label]')
        .should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');

      dataTestId('radar-bubble').should('have.css', 'opacity', '0');
    });

    it('should expand list item details when i click on item', () => {
      cy.get('[data-testid^=list-item')
        .first()
        .find('[data-testid=details]')
        .should('be.hidden')
        .parent()
        .click()
        .find('[data-testid=details]')
        .should('be.visible');
    });
  });
});
