/// <reference types="cypress" />

describe('Home Page E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display welcome message', () => {
    cy.contains('Welcome to Dashboard').should('be.visible');
  });

  it('should display dashboard overview', () => {
    cy.contains('Dashboard Overview').should('be.visible');
    cy.contains('This is a responsive dashboard application').should('be.visible');
  });

  it('should display features list', () => {
    cy.contains('Features:').should('be.visible');
    cy.contains('Responsive layout with sidebar navigation').should('be.visible');
    cy.contains('API integration for data fetching').should('be.visible');
    cy.contains('Table with filtering and searching').should('be.visible');
    cy.contains('Pagination support').should('be.visible');
    cy.contains('Error handling for API calls').should('be.visible');
  });

  it('should have responsive layout', () => {
    cy.viewport(375, 667); // Mobile viewport
    cy.contains('Welcome to Dashboard').should('be.visible');
    
    cy.viewport(1280, 720); // Desktop viewport
    cy.contains('Welcome to Dashboard').should('be.visible');
  });
});

