describe('Movie Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport(1820, 1080)
        cy.get('input[type="email"]').type('Administrator2@movie.time.com');
        cy.get('input[type="password"]').type('Administrator2@movie.time.com');
        cy.get('form').submit();
        })

    
    it('Tikrinama, ar administratoriui atvaizduojamas "admin dashboard" migtukas', () => {
        cy.get('.admindashboard').should('be.visible');
    })

    // it('Tikrinama, ar administratorius gali istrinti pasirinkta filma', () => {
    //     cy.intercept('GET', '/api/movies').as('getMoviesRequest');
    //     cy.intercept('DELETE', '/api/movies/*').as('movieDelete');
    //     cy.wait('@getMoviesRequest').its('response.statusCode').should('eq', 200);
    //     cy.get('div[class="movies-list"]').should('not.be.empty');
    //     cy.get('.movies-list .movie-item').first().click();
    //     cy.get('.modal').should('be.visible');

    //     cy.contains('button.close','DELETE').should('be.visible').click()
    //     // cy.contains('button.close','DELETE').click()
    //     cy.wait('@movieDelete').its('response.statusCode').should('eq', 200);
    // })

    it('Tikrinama, ar administratorius gali koreguoti filma', () => {
        cy.intercept('PATCH', '/api/movies/*').as('editMovieRequest');
        cy.intercept('GET', '/api/movies').as('getMoviesRequest');
        cy.wait('@getMoviesRequest').its('response.statusCode').should('eq', 200);
        cy.get('div[class="movies-list"]').should('not.be.empty');
        cy.get('.movies-list .movie-item').first().click();
        cy.get('.modal').should('be.visible');
        cy.contains('button.close','EDIT').should('be.visible').click()
        cy.get('input[name="director"]').should('be.visible').clear().type('TEST')
        cy.get('input[name="url"]').should('be.visible').clear().type('https://i1.wp.com/hechingerreport.org/wp-content/uploads/2018/04/Jennifer-Heller-Buckley-PHOTO1.jpg?ssl=1')
        cy.get('input[name="imdb_rating"]').should('exist')
        cy.get('input[name="release_year"]').should('be.visible')
        cy.get('input[name="genres"]').should('be.visible').clear().type('TEST')
        cy.get('input[name="cast"]').should('be.visible')
        cy.get('.close').should('exist').contains('button.close','Submit').click()
        cy.wait('@editMovieRequest').its('response.statusCode').should('eq', 200);
    })




















    })