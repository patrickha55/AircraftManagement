/// <reference types="cypress" />

describe("aircraft", () => {

    it("user can view a list of aircrafts, create and delete aircrafts", () => {
        cy.visit("http://localhost:3000/aircraft");

        cy.findByRole('link', {
            name: /aircraft/i
        });
        cy.findByRole('link', {
            name: /roles/i
        });

        cy.scrollTo("bottom");
        cy.scrollTo("top");

        cy.findByRole('button', {
            name: /create aircraft/i
        }).click()

        cy.findByLabelText('ID')
            .type('5');
        cy.findByLabelText('Manufacturer')
            .type('Lockheed Martin');
        cy.findByLabelText('Model')
            .type('F35');
        cy.findByLabelText('Role')
            .select('Attack Helicopter');

        cy.findByRole('button', {
            name: /reset/i
        }).click();

        cy.findByLabelText('ID')
            .type('5');
        cy.findByLabelText('Manufacturer')
            .type('Lockheed Martin');
        cy.findByLabelText('Model')
            .type('F35');
        cy.findByLabelText('Role')
            .select('Air Superiority Fighter');

        cy.findByRole('button', {
            name: /submit/i
        }).click();

        cy.get('body').click(0, 0);

        cy.findByText(/f35/i).scrollIntoView()
            .should('be.visible');

        cy.scrollTo("top");

        cy.get('[data-testid=deleteF35]')
            .click();
    });
});