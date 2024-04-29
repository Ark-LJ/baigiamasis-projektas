describe('Admin Testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport(1820, 1080)
        cy.get('input[type="email"]').type('Administrator2@movie.time.com');
        cy.get('input[type="password"]').type('Administrator2@movie.time.com');
        cy.get('form').submit();
        })

    
    it('Tikrinama, ar administratoriui atvaizduojamas "admin dashboard" migtukas', () => {
        cy.get('.adminBtn').should('be.visible');
    })
    it('Tikrinama, ar administratorius gali sukurti nauja filma', () => {
        cy.get('.adminBtn').should('be.visible').click()
        cy.url().should('include', '/admindashboard'); 
        cy.get('input[name="title"]').should('be.visible').type('TEST')
        cy.get('textarea[name="description"]').should('be.visible').type('TEST')
        cy.get('input[name="director"]').should('be.visible').type('TEST')
        cy.get('input[name="url"]').should('be.visible').type('https://i1.wp.com/hechingerreport.org/wp-content/uploads/2018/04/Jennifer-Heller-Buckley-PHOTO1.jpg?ssl=1')
        cy.get('input[name="imdb_rating"]').should('exist').type('1')
        cy.get('input[name="release_year"]').should('be.visible').type('1')
        cy.get('input[name="genres"]').should('be.visible').type('TEST')
        cy.get('input[name="cast"]').should('be.visible').type('TEST')
     //    cy.intercept('POST', '/api/drafts').as('createMovieRequest');
        cy.get('form').find('select')
              .then(select => {
             cy.wrap(select).select('draft');
             // cy.get('button[type="button"]').contains('No')
             
             cy.get('button[type="submit"]').contains('Add Movie').click()
             // cy.wait('@createMovieRequest').its('response.statusCode').should('eq', '200');
   })
 })
    it('Tikrinama, ar administratorius gali istrinti pasirinkta filma', () => {
        cy.intercept('GET', '/api/movies').as('getMoviesRequest');
        cy.intercept('DELETE', '/api/movies/*').as('movieDelete');
        cy.wait('@getMoviesRequest').its('response.statusCode').should('eq', 200);
        cy.get('div[class="movies-list"]').should('not.be.empty');
        cy.get('.movies-list .movie-item').first().click();
        cy.get('.modal').should('be.visible');

        cy.contains('button.form-button','DELETE').should('be.visible').click()
        // cy.contains('button.close','DELETE').click()
        cy.wait('@movieDelete').its('response.statusCode').should('eq', 200);
    })

    it('Tikrinama, ar administratorius gali koreguoti filma', () => {
        cy.intercept('PATCH', '/api/movies/*').as('editMovieRequest');
        cy.intercept('GET', '/api/movies').as('getMoviesRequest');
        // cy.wait('@getMoviesRequest').its('response.statusCode').should('eq', 200);
        cy.get('div[class="movies-list"]').should('not.be.empty');
        cy.get('.movies-list .movie-item').first().click();
        cy.get('.modal').should('be.visible');
        cy.contains('button.form-button','EDIT').should('be.visible').click()
        cy.get('input[name="director"]').should('be.visible').clear().type('TEST')
        cy.get('input[name="url"]').should('be.visible').clear().type('https://i1.wp.com/hechingerreport.org/wp-content/uploads/2018/04/Jennifer-Heller-Buckley-PHOTO1.jpg?ssl=1')
        cy.get('input[name="imdb_rating"]').should('exist')
        cy.get('input[name="release_year"]').should('be.visible')
        cy.get('input[name="genres"]').should('be.visible').clear().type('TEST')
        cy.get('input[name="cast"]').should('be.visible')
        cy.contains('button.form-button','Submit').should('be.visible').click()
        // cy.wait('@editMovieRequest').its('response.statusCode').should('eq', 200);
    })

    it('Tikrinama, ar administratorius gali ieiti i admin dashboard', () => {
           cy.get('.adminBtn').should('be.visible').click()
           cy.url().should('include', '/admindashboard'); 
    })


        it('Tikrinama, ar administratorius gali koreguoti filmo draft', () => {
           cy.get('.adminBtn').should('be.visible').click()
           cy.url().should('include', '/admindashboard'); 
           cy.get('div ul li img').first().click();
           cy.get('button').contains('Edit').click()
           cy.get('h3').contains('Edit Movie')
           cy.get('input[name="title"]').last().should('be.visible').clear().type('TEST')
           cy.get('textarea[name="description"]').last().should('be.visible').clear().type('TEST')
           cy.get('input[name="director"]').last().should('be.visible').clear().type('TEST')
           cy.get('input[name="url"]').last().should('be.visible').clear().type('https://i1.wp.com/hechingerreport.org/wp-content/uploads/2018/04/Jennifer-Heller-Buckley-PHOTO1.jpg?ssl=1')
           cy.get('input[name="imdb_rating"]').last().should('exist').clear().type('1')
           cy.get('input[name="release_year"]').last().should('be.visible').clear().type('1')
           cy.get('input[name="genres"]').last().should('be.visible').clear().type('TEST')
           cy.get('input[name="cast"]').last().should('be.visible').clear().type('TEST')
                    //   cy.intercept('PATCH', '/api/drafts').as('editMovieRequest');
               cy.get('form').find('select').last()
                 .then(select => {
                cy.wrap(select).select('published');
                cy.get('button').contains('Save').click()
                cy.get('button').contains('No')
                cy.get('button').contains('Yes').click()

                // cy.wait('@editMovieRequest').its('response.statusCode').should('eq', 200);
      })

            it('Tikrinama, ar administratorius gali koreguoti rezervacijos statusa', () => {
           cy.get('.adminBtn').should('be.visible').click()
           cy.url().should('include', '/admindashboard'); 
           cy.intercept('GET', '/api/reservation/admin').as('getReservationsRequest');
           cy.wait('@getReservationsRequest').its('response.statusCode').should('eq', 304);
           cy.get('div > ul').eq(-2).find('li > p').first().click();
           cy.get('h4').contains('Reservation Details')
           cy.intercept('PATCH', '/api/reservation/*').as('updateReservationRequest');
           cy.get('select').last()
                .then(select => {
                const options = select.find('option').toArray();
                const validOptions = options.filter(opt => opt.value !== '');
                const randomOption = Cypress._.sample(validOptions); 
                cy.wrap(select).select(randomOption.value);
                cy.get('button').contains('Close').should('exist')
                cy.get('button').contains('Update status').click()
                cy.wait('@updateReservationRequest').its('response.statusCode').should('eq', 200);
                })
                    })
        })
    })