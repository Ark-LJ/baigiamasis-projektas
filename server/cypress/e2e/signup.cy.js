describe('Signup Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/signup');
    });
  
    it('Atvaizduojamas email ivedimo laukas', () => {
      cy.get('input[type="email"]').should('exist');
    });
  
    it('Atvaizduojamas password ivedimo laukas', () => {
      cy.get('input[type="password"]').should('exist');
    });
  
    it('Tikrina tinkamo el.pasto formata', () => {
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
        cy.get('input[type="email"]').type('eligijus999@gmail.com');
        cy.get('input[type="password"]').type('Testing1!');
        cy.get('button[type="submit"]').click();
        cy.get('.error_warning').should('contain', 'El. paštas jau naudojamas.');
    })

    it('Tikrinama slaptazodzio stiprumas', () => {
      cy.get('input[type="email"]').type('testtest@gmail.com');
      cy.get('input[type="password"]').type('3!');
      cy.get('button[type="submit"]').click();
      cy.get('.error_warning').should('contain', 'Password must contain at least one number and be at least 8 characters long.');
})

  it('Tikrinama sekminga vartotojo registracija bei token generation', () => {
    //pakeist i kita el.past su kiekvienu testu!!!
   cy.get('input[type="email"]').type('testaaat@gmail.com'); 
   cy.get('input[type="password"]').type('Testing1!');
   cy.intercept('POST', '/api/user/signup').as('signupRequest');
   cy.get('button[type="submit"]').click();
   cy.wait('@signupRequest').its('response.statusCode').should('eq', 200);
   cy.url().should('include', '/'); 
   cy.window().then((win) => {
       const userStr = win.localStorage.getItem('user');
       expect(userStr).to.not.be.null;
       const user = JSON.parse(userStr);
       expect(user).to.have.property('token');
})
  })
    
  });
  
  
  
  
  
  
  
  
  