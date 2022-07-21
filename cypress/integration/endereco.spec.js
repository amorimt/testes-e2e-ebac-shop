/// <reference types="cypress" />
import EnderecoPage from '../support/page_objects/endereco.page'
const dadosEndereco = require('../fixtures/endereco.json')

describe('Funcionalidade Endereços - Faturamento e Entrega', () => {
    beforeEach(() => {
        cy.visit('minha-conta')
        cy.fixture('perfil').then(dadosLogin => {
            cy.login(dadosLogin.usuario, dadosLogin.senha)
        })

    });

    it('Deve fazer cadastro de faturamento com sucesso', () => {
        EnderecoPage.editarEnderecoFaturamento('Tamiris', 'Ferreira', 'Google', 'Brasil', 'Rua dois', '03', 'São Paulo', 'São Paulo', '08555471', '77777888', 'email@dominio.com')
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
    });

    it('Deve fazer cadastro de faturamento com sucesso - Usando arquivo de dados', () => {
        EnderecoPage.editarEnderecoFaturamento(
            dadosEndereco[1].nome,
            dadosEndereco[1].sobrenome,
            dadosEndereco[1].empresa,
            dadosEndereco[1].pais,
            dadosEndereco[1].endereco,
            dadosEndereco[1].numero,
            dadosEndereco[1].cidade,
            dadosEndereco[1].estado,
            dadosEndereco[1].cep,
            dadosEndereco[1].telefone,
            dadosEndereco[1].email
        )
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
    });

    it('Deve fazer cadastro de entrega com sucesso', () => {
        EnderecoPage.editarEnderecoEntrega('Tamiris', 'Ferreira', 'Google', 'Brasil', 'Rua dois', '03', 'São Paulo', 'São Paulo', '08555471')
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
    });

    it('Deve fazer cadastro de entrega com sucesso - Usando arquivo de dados', () => {
        EnderecoPage.editarEnderecoEntrega(
            dadosEndereco[5].nome,
            dadosEndereco[5].sobrenome,
            dadosEndereco[5].empresa,
            dadosEndereco[5].pais,
            dadosEndereco[5].endereco,
            dadosEndereco[5].numero,
            dadosEndereco[5].cidade,
            dadosEndereco[5].estado,
            dadosEndereco[5].cep
        )
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
    });

});