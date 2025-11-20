/// <reference types="cypress" />
describe('Search Functionality E2E Tests', () => {
  const mockPosts = [
    { id: 1, userId: 1, title: 'JavaScript Tutorial', body: 'Learn JavaScript basics' },
    { id: 2, userId: 2, title: 'React Guide', body: 'Complete React tutorial' },
    { id: 3, userId: 3, title: 'TypeScript Basics', body: 'Introduction to TypeScript' },
  ];

  beforeEach(() => {
    cy.intercept('GET', '**/posts?_page=1&_limit=10', {
      statusCode: 200,
      body: mockPosts,
    }).as('getPosts');
    
    cy.visit('/data');
    cy.wait('@getPosts');
  });

  it('should display search input', () => {
    cy.get('input[placeholder*="Search"]').should('be.visible');
  });

  it('should filter posts by title', () => {
    cy.get('input[placeholder*="Search"]').type('JavaScript');
    
    // Wait for debounce (500ms)
    cy.wait(600);
    
    cy.contains('JavaScript Tutorial').should('be.visible');
    cy.contains('React Guide').should('not.exist');
    cy.contains('TypeScript Basics').should('not.exist');
  });

  it('should filter posts by body content', () => {
    cy.get('input[placeholder*="Search"]').type('React');
    
    cy.wait(600);
    
    cy.contains('React Guide').should('be.visible');
    cy.contains('JavaScript Tutorial').should('not.exist');
  });

  it('should filter posts by user ID', () => {
    cy.get('input[placeholder*="Search"]').type('1');
    
    cy.wait(600);
    
    cy.contains('JavaScript Tutorial').should('be.visible');
    cy.contains('React Guide').should('not.exist');
  });

  it('should show filtered count', () => {
    cy.get('input[placeholder*="Search"]').type('JavaScript');
    
    cy.wait(600);
    
    cy.contains(/filtered from \d+ loaded/i).should('be.visible');
  });

  it('should show all posts when search is cleared', () => {
    cy.get('input[placeholder*="Search"]').type('JavaScript');
    cy.wait(600);
    
    cy.get('input[placeholder*="Search"]').clear();
    cy.wait(600);
    
    cy.contains('JavaScript Tutorial').should('be.visible');
    cy.contains('React Guide').should('be.visible');
    cy.contains('TypeScript Basics').should('be.visible');
  });

  it('should show no results message when no matches', () => {
    cy.get('input[placeholder*="Search"]').type('NonExistentPost123');
    
    cy.wait(600);
    
    cy.contains('No posts found matching your search criteria').should('be.visible');
  });
});

