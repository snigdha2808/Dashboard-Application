/// <reference types="cypress" />

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

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

// Wait for API calls to complete
Cypress.Commands.add('waitForApi', () => {
  cy.intercept('GET', '**/posts**').as('getPosts');
  cy.wait('@getPosts');
});

export {};

