/// <reference types="cypress" />

import EnderecoPage from '../support/page_objects/endereco.page'
const dadosEndereco = require('../fixtures/endereco.json')
import faker from 'faker'


// context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
/*  Como cliente 
    Quero acessar a Loja EBAC 
    Para fazer um pedido de 4 produtos 
    Fazendo a escolha dos produtos
    Adicionando ao carrinho
    Preenchendo todas opções no checkout
    E validando minha compra ao final */

describe('Funcionalidade login', () => {
    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Deve fazer login usando o comando cy.login e entrar na página "Minha conta"', () => {
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })
        cy.get('.page-title').should('contain', 'Minha conta')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac')
    });

    it('Deve fazer login manualmente e entrar na página "Minha conta"', () => {
        cy.fixture('perfil').then(dadosLogin => {
            cy.get('#username').type(dadosLogin.usuario)
            cy.get('#password').type(dadosLogin.senha, { log: false })
            cy.get('.woocommerce-form > .button').click()
            cy.get('.page-title').should('contain', 'Minha conta')
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, aluno_ebac')

        })
    });
});

describe('Funcionalidade pré cadastro', () => {

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('Deve completar pré cadastro com sucesso usando Comandos customizados', () => {
        cy.preCadastro(faker.internet.email(), 'senha@forte!', 'Vanusa', 'Silva')
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso')
    });

    it('Deve completar o pré cadastro com sucesso', () => {
        const nomeFaker = faker.name.firstName()

        cy.get('#reg_email').type( faker.internet.email(nomeFaker))
        cy.get('#reg_password').type('#teste@teste*')
        cy.get(':nth-child(4) > .button').click()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nomeFaker)
        cy.get('#account_last_name').type(faker.name.lastName())
        cy.get('.woocommerce-Button').click()

        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')

    });

});

describe('Funcionalidade cadastro de faturamento e entrega', () => {
    beforeEach(() => {
        cy.visit('minha-conta')
        cy.fixture('perfil').then((dados) => {
            cy.login(dados.usuario, dados.senha)
        })

    });

    it('Deve fazer cadastro de faturamento com sucesso', () => {

        cy.get('.page-title').should('contain', 'Minha conta')
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

describe('Funcionalidade página de produtos', () => {
    beforeEach(() => {
        cy.visit('produtos')

    });

    it('Deve selecionar um produto da lista', () => {
        cy.get('ul.page-numbers').within(() => {
            cy.contains('2').click()
        })

        cy.get('[class= "product-block grid"]')
            .contains('Bruno Compete Hoodie')
            .click()
    });

    it('Deve adicionar um produto ao carrinho', () => {
        const quantidade = 4

        cy.get('ul.page-numbers').within(() => {
            cy.contains('2').click()
    
          })

        cy.get('[class= "product-block grid"]')
            .contains('Bruno Compete Hoodie').click()

            cy.get('ul[data-attribute_name="attribute_size"]').within(() => {
                cy.contains('M').parent().parent().click()
        
              })

              cy.get('ul[data-attribute_name="attribute_color"]').within(() => {
                cy.contains('Black').parent().parent().click()
        
              })

        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click()

        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Bruno Compete Hoodie” foram adicionados no seu carrinho.')

    });

    it('Deve adicionar produtos no carrinho usando Comandos customizados', () => {
        cy.addProdutos('Cassia Funnel Sweatshirt', 'M', 'White', 4)

    });



});




