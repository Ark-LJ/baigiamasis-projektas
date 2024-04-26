

describe('Login Page', () => {
  beforeEach(() => {
    // Assuming your login page is served at this URL
    cy.visit('http://localhost:3000');
  });

  it('Atvaizduojamas email ivedimo laukas', () => {
    cy.get('input[type="email"]').should('exist');
  });

  it('Atvaizduojamas password ivedimo laukas', () => {
    cy.get('input[type="password"]').should('exist');
  });

  //WIP - NEED UNCAUGHT ERROR TO GO AWAY
  // it('Atvaizduojama klaida kai vartotoja iveda netinkamus duomenis', () => {
  //   cy.get('input[type="email"]').type('eligijus999@gmail.com');
  //   cy.get('input[type="password"]').type('Testinag1!');

  //   cy.get('button[type="submit"]').click();
    
  // });

  it('Vartotojas sekmingai prijungiamas ir token generuojamas', () => {
    cy.get('input[type="email"]').type('eligijus999@gmail.com');
    cy.get('input[type="password"]').type('Testing1!');
    cy.intercept('POST', '/api/user/login').as('loginRequest');
    cy.get('form').submit();
    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/'); 
    cy.window().then((win) => {
        const userStr = win.localStorage.getItem('user');
        expect(userStr).to.not.be.null;
        const user = JSON.parse(userStr);
        expect(user).to.have.property('token');
        
    });

    
  });
 



  });









