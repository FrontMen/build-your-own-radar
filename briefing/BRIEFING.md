
A briefing for creating the Intracto TechRadar. An SPA derived from an existing TechRadar project build in vanilla js, jQuery and D3.

## Rationale

Create a techradar webapp, much like the [https://www.thoughtworks.com/radar/techniques?blipid=1041](thoughtworks radar), with some UX/design changes to comply with Intracto styleguide and technical changes to suit our needs. We will deploy this SPA on the intracto site as part of our ongoing cooperation.

Our techradar data is stored and modified in the folowing spreadsheet: https://docs.google.com/spreadsheets/d/1V2DJEiF7vmx-zhh4_kyUmDsUVF7zt40SSkkKDRoJXug/
It's our database for now.
The code in this fork supplies a fully functional techradar. It loads the data from `src/util/data/sheet.js`.
This json file represents [https://docs.google.com/spreadsheets/d/1V2DJEiF7vmx-zhh4_kyUmDsUVF7zt40SSkkKDRoJXug/edit](the google spreadsheet).

Use the provided briefing.pdf (in the briefing folder) as reference and go through the notes carefully. Everything represented in this PDF should also be represented in [https://trello.com/b/LOCO82lQ/intracto-techradar](the trello) as task. We don't have dedicated documentation on the Intracto styleguide, so please use their [https://www.intracto.com/nl-nl](homepage) as reference. And check for colors/fonts/logo's in the provided briefing folder. 

### Technical specs

* Choose a framework with
     * pure frontend deployment (HTML/JS/CSS)
     * easy scaffolding (e.g. create react app)
     * easily configurable router

* Templates
     * Generic template with slots for
          * header
          * page
          * footer
     * Header (Mainmenu) template with
          * logo
          * links to 'quadrant' pages
     * Footer template with
          * generic links
     * Introduction page template with
          * title
          * text
          * CTA link
          * image
     * Techradadar page template with
          * title
          * search functionality (as is in current build)
          * selected 'quadrant' data
          * d3 circle graphic (as is in current build)
          * expandable item list (as components if possible)
               * text in expandable should be parsed as HTML to enable links to detail page
               * detail page content location unknown
     * Detail page template with
          * title
          * text
          * BACK link
          * image

* Business logic
     * Load spreadsheet from remote google api (instead of hardcoded JSON file)
     * Add loading state to template (skeleton loading?)
     * Connect expandable list component to d3 graphic if possible (with events?)
     * Add extra filter to data loading
          * filter on 'In radar?' column
               * Y -> show item in graphic
               * N -> hide item
     * Add extra toggle to UX of the graphic
          * filter when toggled on the following columns:
               * ITR BE
               * ITR NL
               * FM

* Tests
     * Test templates through already configured Cyprus
     * Add unit tests to new business logic



     

