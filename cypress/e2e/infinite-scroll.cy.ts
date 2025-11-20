/// <reference types="cypress" />
describe('Infinite Scroll E2E Tests', () => {
  const firstPagePosts = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    userId: i + 1,
    title: `Post ${i + 1}`,
    body: `Body content ${i + 1}`,
  }));

  const secondPagePosts = Array.from({ length: 10 }, (_, i) => ({
    id: i + 11,
    userId: i + 11,
    title: `Post ${i + 11}`,
    body: `Body content ${i + 11}`,
  }));

  beforeEach(() => {
    cy.intercept('GET', '**/posts?_page=1&_limit=10', {
      statusCode: 200,
      body: firstPagePosts,
    }).as('getFirstPage');

    cy.intercept('GET', '**/posts?_page=2&_limit=10', {
      statusCode: 200,
      body: secondPagePosts,
    }).as('getSecondPage');

    cy.visit('/data');
    cy.wait('@getFirstPage');
  });

  it('should load initial 10 posts', () => {
    cy.contains('Post 1').should('be.visible');
    cy.contains('Post 10').should('be.visible');
    cy.contains('Post 11').should('not.exist');
  });

  it('should load more posts on scroll', () => {
    // Scroll to bottom
    cy.scrollTo('bottom');
    
    // Wait for second page to load
    cy.wait('@getSecondPage');
    
    // Check new posts are loaded
    cy.contains('Post 11').should('be.visible');
    cy.contains('Post 20').should('be.visible');
  });

  it('should show loading indicator while fetching more data', () => {
    cy.scrollTo('bottom');
    cy.contains('Fetching more data from API').should('be.visible');
  });

  it('should append new posts to existing list', () => {
    cy.contains('Post 1').should('be.visible');
    
    cy.scrollTo('bottom');
    cy.wait('@getSecondPage');
    
    // Both old and new posts should be visible
    cy.contains('Post 1').should('be.visible');
    cy.contains('Post 11').should('be.visible');
  });

  it('should show end message when all data is loaded', () => {
    // Mock last page with fewer items
    cy.intercept('GET', '**/posts?_page=2&_limit=10', {
      statusCode: 200,
      body: [{ id: 11, userId: 11, title: 'Post 11', body: 'Body 11' }],
    }).as('getLastPage');

    cy.scrollTo('bottom');
    cy.wait('@getLastPage');
    
    cy.contains('All data loaded').should('be.visible');
  });
});

