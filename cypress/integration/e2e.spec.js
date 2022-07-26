/// <reference types="cypress" />

import EnderecoPage from '../support/page_objects/endereco.page'
const dadosEndereco = require('../fixtures/endereco.json')
import faker from 'faker'

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */
        
        beforeEach(() => {
            cy.visit('minha-conta')
        });
        it('Fazer login e realizar compra', () => {
            cy.fixture('perfil').then((dados) => {
                cy.login(dados.usuario, dados.senha)
            })
            cy.get('.page-title').should('contain', 'Minha conta')
            cy.visit('produtos')
            let quantidade = 4
            cy.addProdutos('Ajax Full-Zip Sweatshirt', 'M', 'Green', 4)
            cy.get('.woocommerce-message').should('contain', quantidade + ' × “Ajax Full-Zip Sweatshirt” foram adicionados no seu carrinho.')
        });
    });


