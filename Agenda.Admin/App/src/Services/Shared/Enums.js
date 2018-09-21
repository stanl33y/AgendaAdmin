;(function (app, angular, undefined) {
    'use strict';

    app.constant('Enum', {
        Confirmar: [{ Value: 1, Name: "Sim" }, { Value: 0, Name: "Não", }],
        Situacao: [{ Value: 1, Name: "Ativo" }, { Value: 0, Name: "Cancelado", }],
        Origem: [{ Value: 1, Name: "Administrativo" }, { Value: 0, Name: "Comercial", }],
        OrigensAtendimento: [{ Value: 0, Name: "Atendimento" }, { Value: 1, Name: "Comercial", }],
        SituacaoCliente: [{ Value: 1, Name: "Ativo" }, { Value: 0, Name: "Inativo", }, { Value: 2, Name: "Potencial", }],
        TipoValorAnexoFaixa:[{Value:0, Name:"Fixo"},{Value:1, Name:"DiretoNaFaixa"},{Value:2, Name:"EfeitoCascata"}],
        LiberarAcessoCliente: [{ Value: 1, Name: "Sim" }, { Value: 0, Name: "Não", }, { Value: 2, Name: "Violação de Data", }],
        Sexo: [{ Value: 1, Name: "Masculino" }, { Value: 0, Name: "Feminino" }],
        EstadoCivil: [{ Value: 0, Name: "Solteiro" }, { Value: 1, Name: "Casado" }, { Value: 2, Name: "Divorciado" }, { Value: 3, Name: "Viuvo" }],
        TipoContato: [{ Value: 0, Name: "Telefone" }, { Value: 1, Name: "Celular" }, { Value: 2, Name: "Email" }],
        TipoContrato: [{ Value: 0, Name: "Licença de uso" }, { Value: 1, Name: "Locação" }, { Value: 2, Name: "Suporte" }],
        TipoCobrancaViagem: [{ Value: 1, Name: "Cobra" }, { Value: 0, Name: "Não cobra" }],
        TipoAditamento: [{ Value: 0, Name: "Prazo" }, { Value: 1, Name: "Valor" }, { Value: 2, Name: "Prazo/Valor" }, { Value: 3, Name: "Simples" }, { Value: 4, Name: "Distrato" }],
        TipoEmpresa: [{ Value: 0, Name: "Própria" }, { Value: 1, Name: "Parceiro" }, { Value: 2, Name: "Concorrente" }],
        TipoPergunta: [
            { Value: 0, Name: "Dropdown" },
            { Value: 1, Name: "Radio - Horizontal" },
            { Value: 2, Name: "Radio - Vertical" },
            { Value: 3, Name: "Checkbox- Horizontal" },
            { Value: 4, Name: "Checkbox - Vertical" },
            { Value: 5, Name: "Textbox" }
        ],
        Estados: [{ Value: 1, Name: "Acre", Uf: "AC" }, { Value: 2, Name: "Alagoas", Uf: "AL" }, { Value: 3, Name: "Amapá", Uf: "AP" },
            { Value: 4, Name: "Amazonas", Uf: "AM" }, { Value: 5, Name: "Bahia", Uf: "BA" }, { Value: 6, Name: "Ceará", Uf: "CE" },
            { Value: 7, Name: "Distrito Federal", Uf: "DF" }, { Value: 8, Name: "Espírito Santo", Uf: "ES" }, { Value: 9, Name: "Goiás", Uf: "GO" },
            { Value: 10, Name: "Maranhão", Uf: "MA" }, { Value: 11, Name: "Mato Grosso", Uf: "MT" }, { Value: 12, Name: "Mato Grosso do Sul", Uf: "MS" },
            { Value: 13, Name: "Minas Gerais", Uf: "MG" }, { Value: 14, Name: "Pará", Uf: "PA" }, { Value: 15, Name: "Paraíba", Uf: "PB" },
            { Value: 16, Name: "Paraná", Uf: "PR" }, { Value: 17, Name: "Pernambuco", Uf: "PE" }, { Value: 18, Name: "Piauí", Uf: "PI" },
            { Value: 19, Name: "Rio de Janeiro", Uf: "RJ" }, { Value: 20, Name: "Rio Grande do Norte", Uf: "RN" }, { Value: 21, Name: "Rio Grande do Sul", Uf: "RS" },
            { Value: 22, Name: "Rondônia", Uf: "RO" }, { Value: 23, Name: "Roraima", Uf: "RR" }, { Value: 24, Name: "Santa Catarina", Uf: "SC" },
            { Value: 25, Name: "São Paulo", Uf: "SP" }, { Value: 26, Name: "Sergipe", Uf: "SE" }, { Value: 27, Name: "Tocantins", Uf: "TO" }],
        TipoDocumentoLink: [{ Value: 0, Name: "Cliente"}, { Value: 1, Name: "Implantação" }],
        SistemaOperacionalLink: [{ Value: 0, Name: "Windows" }, { Value: 1, Name: "Linux", }, { Value: 2, Name: "Outros", }],
        TipoContaLink: [{ Value: 0, Name: "Guia" }, { Value: 1, Name: "Ficha de compensação", }],
        BancoDadosNetLink: [{ Value: 0, Name: "MySql" }, { Value: 1, Name: "MSQL", }, { Value: 2, Name: "Access", }],
        FlashImagemLink: [{ Value: 0, Name: "Flash" }, { Value: 1, Name: "Imagem", }],
        MeioContato: [{ Value: 0, Name: "Telefone" }, { Value: 1, Name: "Skype", }, { Value: 2, Name: "Email", }, { Value: 3, Name: "Chat", }],
        SituacaoAtendimento: [{ Value: 0, Name: "Aberto" }, { Value: 2, Name: "Encaminhado" }, { Value: 1, Name: "Finalizado", }],
        PrazoAtendimento: [{ Value: 0, Name: "No Prazo" }, { Value: 1, Name: "Fora do Prazo" }],
        TipoTelaLogin: [{ Value: 0, Name: "Entrada com ID Eletrônico" }, { Value: 1, Name: "Entrada com ID Eletrônico e CPF" }],
        FormaPagamento: [{ Value: 0, Name: "Boleto" }, { Value: 1, Name: "Depósito em Conta" }],
        SituacaoFinanceiro: [{ Value: 0, Name: "Gerado" }, { Value: 1, Name: "Enviado", }, { Value: 2, Name: "Download", }],

        Get: function (enumeracao, value) {
            for (var i = 0; i < enumeracao.length; i++) {
                if (enumeracao[i].Value === value) { return enumeracao[i]; }
            }
            return undefined;
        }
    });
})(window.app, window.angular);
