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

    describe('Teste de funcionalidade E2e', () => {
        beforeEach(() => {
            cy.visit('minha-conta')
        });

        it('Deve fazer login com sucesso', () => {
            cy.fixture('perfil').then((dados) => {
                cy.login(dados.usuario, dados.senha)
            })
            cy.get('.page-title').should('contain', 'Minha conta')
        });

        it('Deve completar pré cadastro com sucesso', () => {
            cy.preCadastro(faker.internet.email(), 'senha@forte!', 'Vanessa', 'Pereira')
            cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso')
        });

        it('Deve fazer cadastro de faturamento com sucesso', () => {
            EnderecoPage.editarEnderecoFaturamento('Tamiris', 'Ferreira', 'Google', 'Brasil', 'Rua dois', '03', 'São Paulo', 'São Paulo', '08555471', '77777888', 'email@dominio.com')
            cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
        });

        beforeEach(() => {
            cy.visit('produtos')
        });

        it('Deve adicionar produtos no carrinho com sucesso', () => {
            let quantidade = 4
            cy.addProdutos('Cassia Funnel Sweatshirt', 'M', 'White', 4)
            cy.get('.woocommerce-message').should('contain', quantidade + ' × “Cassia Funnel Sweatshirt” foram adicionados no seu carrinho.')
        });
    });
})