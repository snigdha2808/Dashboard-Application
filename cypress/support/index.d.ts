/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to wait for API calls to complete
       * @example cy.waitForApi()
       */
      waitForApi(): Chainable<void>;
    }
  }
}

export {};

