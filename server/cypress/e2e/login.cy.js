

describe('Login Page', () => {
  beforeEach(() => {
    // Assuming your login page is served at this URL
    cy.visit('http://localhost:3000/login');
  });

  it('Atvaizduojamas email ivedimo laukas', () => {
    cy.get('input[type="email"]').should('exist');
  });

  it('Atvaizduojamas password ivedimo laukas', () => {
    cy.get('input[type="password"]').should('exist');
  });

  it('Privalomu ivedimo lauku validacijos tikrinimas', () =>
    cy.g
)
});








