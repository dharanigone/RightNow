
describe('User want to check if they are affected by Master card Data Leak ', ()=>{
    
    beforeEach(function () { 
        cy.fixture('example').then((formData) => { 
            this.formData = formData 
        }) 
        cy.visit('https://main--rightnow-verticals.netlify.app/gdpr')
    }) 

    it('user submits valid contact information to check their Master card data leak', function () {  
        cy.screenshot()       
        cy.fixture('example.json').as('formData')
        
        cy.get('[data-cy="contained-button"]').click()

        //verify user is redirected to Contact Information page
        cy.url().should('eq', 'https://main--rightnow-verticals.netlify.app/gdpr/personal-survey')

        //Verify 'Check' button is disabled
        cy.get('[data-cy="contained-button"]').should('be.disabled')
        cy.screenshot()

        cy.get('[data-cy="email-address"]').type(this.formData.validEmail)
        cy.get('.MuiSelect-select').click()
        cy.get('[data-value="MASCULINE"]').click()
        cy.get('[data-cy="first-name"]').type(this.formData.firstName)
        cy.get('[data-cy="last-name"]').type(this.formData.surname)
        cy.get('[data-cy="termsAndConditions"]').click()
        
        //Verify 'Check' button is enabled
        cy.get('[data-cy="contained-button"]').should('be.enabled')
        cy.screenshot()

        cy.get('[data-cy="contained-button"]').click()

        //Verify that success page is loaded.
        cy.url().should('eq', 'https://main--rightnow-verticals.netlify.app/gdpr/success')
        cy.screenshot()

    })


    it('user submits invalid contact information to check their Master card data leak', function () {         
        cy.fixture('example.json').as('formData')

        cy.screenshot()
        cy.get('[data-cy="contained-button"]').click()

        //verify user is redirected to Contact Information page
        cy.url().should('eq', 'https://main--rightnow-verticals.netlify.app/gdpr/personal-survey')

        //Verify 'Check' button is disabled
        cy.get('[data-cy="contained-button"]').should('be.disabled')
        cy.screenshot()

        cy.get('[data-cy="email-address"]').type(this.formData.invalidEmail)
        cy.get('.MuiSelect-select').click()
        cy.get('[data-value="MASCULINE"]').click()
        cy.get('[data-cy="first-name"]').type(this.formData.firstName)
        cy.get('[data-cy="last-name"]').type(this.formData.surname)
        cy.get('[data-cy="termsAndConditions"]').click()
        
        //Verify 'Check' button is enabled
        cy.get('[data-cy="contained-button"]').should('be.enabled')

        cy.screenshot()

        cy.get('[data-cy="contained-button"]').click()
        
        //Verify that user is atill ar Contact information page.
        cy.url().should('eq', 'https://main--rightnow-verticals.netlify.app/gdpr/personal-survey')

        //Verify the error message stating invalid email address
        cy.get('.Mui-error').should('be.visible')
        cy.screenshot()
    })    
})