/// <reference types="cypress" />
 
describe('Funcionalidade página de produtos', () => {
 
    beforeEach(() => {
        cy.visit('produtos')
    });
  
    // it('Deve selecionar um produto da lista', () => {
    //     cy.get(':nth-child(2) > .page-numbers').click()
    //     cy.get('[class= "product-block grid"]')
    //         //.first()
    //         //.last()
    //         //.eq(3)
    //         .contains('Bruno Compete Hoodie')
    //         .click()
    // });
  
    it('Deve adicionar um produto ao carrinho', () => {
        var quantidade = 4
        cy.get(':nth-child(1) > .page-numbers').click()
        cy.get('[class= "product-block grid"]')
            .contains('Ajax Full-Zip Sweatshirt').click()
        cy.get('.button-variable-item-M').click()
        cy.get('.button-variable-item-Green').click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()
  
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Bruno Compete Hoodie” foram adicionados no seu carrinho.')
  
    });
  
    it('Deve adicionar produtos no carrinho usando Comandos customizados', () => {
        cy.addProdutos('Ajax Full-Zip Sweatshirt', 'M', 'Green', 4)
        
    });
  
    // it('Deve adicionar produtos no carrinho usando Comandos customizados', () => {
    //     cy.addProdutos('Autumn Pullie', 'XS', 'Red', 4)
  
    // });
 });