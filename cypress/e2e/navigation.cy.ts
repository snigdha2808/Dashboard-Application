/// <reference types="cypress" />
describe('Navigation E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should navigate to Home page', () => {
    cy.contains('Home').click();
    cy.url().should('include', '/');
    cy.contains('Welcome to Dashboard').should('be.visible');
  });

  it('should navigate to Data page', () => {
    cy.contains('Data').click();
    cy.url().should('include', '/data');
    cy.contains('Posts').should('be.visible');
  });

  it('should highlight active route in sidebar', () => {
    // Check Home is active on initial load
    cy.get('a[href="/"]').should('have.class', 'bg-blue-600');
    
    // Navigate to Data
    cy.contains('Data').click();
    cy.get('a[href="/data"]').should('have.class', 'bg-blue-600');
    cy.get('a[href="/"]').should('not.have.class', 'bg-blue-600');
  });

  it('should display sidebar on all pages', () => {
    cy.contains('Dashboard').should('be.visible');
    cy.contains('Home').should('be.visible');
    cy.contains('Data').should('be.visible');
    
    cy.contains('Data').click();
    cy.contains('Dashboard').should('be.visible');
    cy.contains('Home').should('be.visible');
    cy.contains('Data').should('be.visible');
  });
});

