describe('Signup Page', () => {
    beforeEach(() => {
      // Assuming your login page is served at this URL
      cy.visit('http://localhost:3000/signup');
    });
  
    it('Atvaizduojamas email ivedimo laukas', () => {
      cy.get('input[type="email"]').should('exist');
    });
  
    it('Atvaizduojamas password ivedimo laukas', () => {
      cy.get('input[type="password"]').should('exist');
    });
  
    it('displays an error for invalid email format', () => {
        cy.get('input[type="email"]').type('invalid-email');
        cy.get('.signup button[type="submit"]').click();
        cy.get('input[type="email"]')
        .type('invalid-email')
        .then($input => {
          expect($input[0].validity.valid).to.be.false;
          expect($input[0].validity.typeMismatch).to.be.true;
        });
      });
    
    it('Tikrinama, ar el.pastas nera uzimtas.', () => {

          // Testing handling of an already taken email
          cy.get('input[type="email"]').type('eligijus999@gmail.com');
          cy.get('input[type="password"]').type('Testing1!');
          cy.get('button[type="submit"]').click();
          cy.get('.error').should('contain', 'El. paštas jau naudojamas.');
    })
    
  });
  
  
  
  
  
  
  
  
  