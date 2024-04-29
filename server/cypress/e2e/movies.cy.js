describe('Movie Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport(1820, 1080)
        cy.get('input[type="email"]').type('eligijus999@gmail.com');
        cy.get('input[type="password"]').type('Testing1!');
        cy.get('form').submit();

      });

      it('Vartotojas mato filmus', () => {
        cy.intercept('GET', '/api/movies').as('getMoviesRequest');
        cy.wait('@getMoviesRequest').its('response.statusCode').should('eq', 304);
        cy.get('div[class="movies-list"]').should('not.be.empty');
      })

      it('Vartotojas gali pasirinkti filma', () => {
        cy.intercept('GET', '/api/movies').as('getMoviesRequest');
        cy.wait('@getMoviesRequest').its('response.statusCode').should('eq', 200);
        cy.get('div[class="movies-list"]').should('not.be.empty');
        cy.get('.movies-list .movie-item').first().click();
        cy.get('.modal').should('be.visible');
      })
    
      it('Vartotojas gali iseiti is pasirinkto filmo', () => {
        cy.intercept('GET', '/api/movies').as('getMoviesRequest');
        cy.wait('@getMoviesRequest').its('response.statusCode').should('eq', 200);
        cy.get('div[class="movies-list"]').should('not.be.empty');
        cy.get('.movies-list .movie-item').first().click();
        cy.get('.modal').should('be.visible');
        cy.contains('button.form-button','Go Back').should('be.visible').click()
        cy.get('.movies-list .movie-item').should('be.visible');
      })

      it('Vartotojas gali rezervuoti filma', () => { 
          //  istrinti pakurta rezervacija pagal sio testo paimta filma po kiekvieno testo
        cy.intercept('GET', '/api/movies').as('getMoviesRequest');
        cy.wait('@getMoviesRequest').its('response.statusCode').should('eq', 200);
        cy.get('div[class="movies-list"]').should('not.be.empty');
        cy.get('.movies-list .movie-item').first().click();
        cy.get('.modal').should('be.visible');
        cy.get('.picker-location').find('select')
        .then(select => {
          const options = select.find('option').toArray();
          const validOptions = options.filter(opt => opt.value !== '');
          const randomOption = Cypress._.sample(validOptions); 
          cy.wrap(select).select(randomOption.value);
        cy.intercept('POST', '/api/reservation').as('reservationRequest');
        cy.contains('button.form-button','Rent DVD').should('be.visible').click()
        cy.wait('@reservationRequest').its('response.statusCode').should('eq', 200);
        cy.get('.movies-list .movie-item').should('be.visible');
      })

    it('Vartotojas gali koreguoti rezervacija', () => {
      cy.intercept('PATCH', '/api/reservation/*').as('reservationPatch');
      cy.get('.ordered-list-item .btn-1').first().click().should('contain', 'Save')
      cy.get('.ordered-list-item .react-datepicker-wrapper').should('exist')
      cy.get('.ordered-list-item select').should('exist')
      cy.get('.ordered-list-item').find('select')
      .then(select => {
        const options = select.find('option').toArray();
        const validOptions = options.filter(opt => opt.value !== '');
        const randomOption = Cypress._.sample(validOptions); 
        cy.wrap(select).select(randomOption.value);
        cy.get('.ordered-list-item .btn-1').first().should('contain', 'Save').click()
        cy.wait('@reservationPatch').its('response.statusCode').should('eq', 200);
      })
    })
      it('Vartotojui vaizduoja klaida kai bandoma sukurti rezervacija neuzpildes duomenu', () => {
        cy.intercept('GET', '/api/movies').as('getMoviesRequest');
        cy.wait('@getMoviesRequest').its('response.statusCode').should('eq', 304);
        cy.get('div[class="movies-list"]').should('not.be.empty');
        cy.get('.movies-list .movie-item').first().click();
        cy.get('.modal').should('be.visible');
        cy.intercept('POST', '/api/reservation').as('reservationRequest');
        cy.contains('button.form-button','Rent DVD').should('be.visible').click()
        cy.wait('@reservationRequest').its('response.statusCode').should('eq', 400)
        cy.get('.modal-error').should('contain', 'Prašome užpildyti visus laukelius')

      })
 
      })

    it('Vartotojas gali istrinti rezervacija', () => {
        cy.intercept('DELETE', '/api/reservation/*').as('reservationDelete');
        cy.get('.ordered-list-item .btn-1').last().should('contain', 'Delete').click()
        cy.wait('@reservationDelete').its('response.statusCode').should('eq', 200);
        })
        
      it('Vartotojas logoutint gali', () => {
        cy.contains('button.navBtn','Log Out').should('be.visible').click()
        cy.url().should('include', '/'); 
        cy.window().then((win) => {
            const userStr = win.localStorage.getItem('user');
            expect(userStr).to.be.null; 
        });
      });

})

