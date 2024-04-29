describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Atvaizduojamas email ivedimo laukas', () => {
    cy.get('input[type="email"]').should('exist');
  });

  it('Atvaizduojamas password ivedimo laukas', () => {
    cy.get('input[type="password"]').should('exist');
  });

  it('Atvaizduojama klaida kai vartotojas iveda netinkama slaptazodi', () => {
    cy.get('input[type="email"]').type('NormalUser1@gmail.com');
    cy.get('input[type="password"]').type('NormalUser1@gmail.com2');
    cy.get('button[type="submit"]').click();
    cy.get('.error_warning').should('contain', 'Neteisingas slaptažodis')
  });

  it('Atvaizduojama klaida kai vartotojas iveda netinkama el. pasta', () => {
    cy.get('input[type="email"]').type('bad@email');
    cy.get('input[type="password"]').type('Testing1!');
    cy.get('button[type="submit"]').click();
    cy.get('.error_warning').should('contain', 'El. paštas neteisingas')
  });

  it('Vartotojas sekmingai prijungiamas ir token generuojamas', () => {
    cy.get('input[type="email"]').type('NormalUser1@gmail.com');
    cy.get('input[type="password"]').type('NormalUser1@gmail.com');
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









