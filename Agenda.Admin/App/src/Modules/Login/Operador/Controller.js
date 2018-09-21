;(function (app, angular, undefined) {
    'use strict';

    app.controller('OperadorController', ['$location', 'Enum', 'OperadoresFactory', 'FuncionarioFactory', 'GrupoAcessoFactory', 'CargoFactory', '$timeout', 'Operador', 'toastr', function ($location, Enum, OperadoresFactory, FuncionarioFactory, GrupoAcessoFactory, CargoFactory, $timeout, Operador, toastr) {
        var $public = this;
        var $private = {};

        //abrir Datepicker
        $public.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $public.opened = true;
        };

        $public.clear = function () {
            $public.operador.DataExpiracao = null;
        };

        //Valida a Senha
        $public.validaSenha = function () {

            //EDITAR
            if ($public.operador.OperadorID) {
                if ($public.Senha !== "") {
                    if ($public.Senha.length < 6 || $public.Senha !== $public.ConfirmaSenha) {
                        return false;
                    }
                    else {
                        return true;
                    }
                } else {
                    return true;
                }

                //INSERIR
            } else {
                if (!$public.Senha || $public.Senha.length < 6)
                { return false; }

                return ($public.Senha && $public.Senha === $public.ConfirmaSenha);
            }
        };

        //Funcao para submit enviar
        $public.Enviar = function (form) {
            $public.operador.Senha = $public.Senha;
            $public.operador.FuncionarioID = $public.FuncionarioSelecionado.FuncionarioID;
            $public.operador.LogGrupoAcessoID = $public.GrupoAcessoSelecionado.LogGrupoAcessoID;
            $public.operador.Situacao = $public.SituacaoSelecionado.Value;
            $public.ShowError = false;
            $public.ErrorMessage = '';

            if (Operador) {//Editar
                //Se existir a senha e for valida, envia para alterar
                if ($public.operador.Senha) //IMPLEMENTAR
                {
                    $public.operador.Senha = $public.Senha;
                }
                $private.EnviarEditar(form);

            } else {
                $public.operador.Senha = $public.Senha;
                $private.EnviarCadastrar(form);
            }
        };

        //Funcao cadastrar
        $private.EnviarCadastrar = function (form) {
            OperadoresFactory.PostOperador($public.operador, $public.CargosSelecionados)
          .success(function (dados, status) {
              toastr.success('Operador cadastrado com sucesso !', 'Sucesso', { progressBar: true, timeOut: 3000 });
              $location.path('operador');
          })
              .error(function (data, status) {
                  switch (status) {
                      case 404:
                          toastr.error('Funcionário não encontrado, Verifique !', 'Atenção', { progressBar: true, timeOut: 3000 });
                          $private.Init();
                          break;
                      case 406:
                          toastr.error('A senha deve conter no mínimo 6 caracteres, possuir letras e números, ter pelo menos uma letra maiuscula e um caracter especial !', 'Atenção', { progressBar: true, timeOut: 3000 });
                          form.Senha.$invalid = true;
                          form.validaSenha.$invalid = true;
                          break;
                      case 409:
                          toastr.warning('Identificador já está sendo utilizado, Verifique !', 'Atenção', { progressBar: true, timeOut: 3000 });
                          form.Identificador.$invalid = true;
                          break;
                      default:
                          toastr.error('Verifique o preenchimento de todos os campos', 'Atenção', { progressBar: true, timeOut: 3000 });
                          break;
                  }
              });
        };

        //Funcao Editar
        $private.EnviarEditar = function (form) {
            OperadoresFactory.PutOperador($public.operador, $public.CargosSelecionados)
         .success(function (dados, status) {

             toastr.success('Operador alterado com sucesso !', 'Sucesso', { progressBar: true, timeOut: 2000 });
             $location.path('operador');
         })
             .error(function (data, status) {

                 switch (status) {
                     case 404:
                         toastr.error('Funcionário não encontrado, Verifique !', 'Atenção', { progressBar: true, timeOut: 3000 });
                         $private.Init();
                         break;
                     case 406:
                         toastr.error('A senha deve conter no mínimo 6 caracteres, possuir letras e números, ter pelo menos uma letra maiuscula e um caracter especial !', 'Atenção', { progressBar: true, timeOut: 3000 });
                         form.Senha.$invalid = true;
                         form.validaSenha.$invalid = true;
                         break;
                     case 409:
                         toastr.warning('Identificador já está sendo utilizado, Verifique !', 'Atenção', { progressBar: true, timeOut: 3000 });
                         form.Identificador.$invalid = true;
                         break;
                     default:
                         toastr.error('Verifique o preenchimento de todos os campos', 'Atenção', { progressBar: true, timeOut: 3000 });
                         break;
                 }
                 $private.Init();
             });
        };

        //Iniciar os valores
        $private.Init = function () {

            $public.Situacao = Enum.Situacao;

            if (Operador) { //Editar
                $public.operador = Operador;
                $public.Senha = "";
                $public.title = "Editar operadores";
                $public.SituacaoSelecionado = Enum.Get(Enum.Situacao, Operador.Situacao);

                if ($public.operador.DataExpiracao !== null) {
                    $public.operador.DataExpiracao = new Date($public.operador.DataExpiracao);
                }

            } else { //Cadastrar
                $public.title = "Cadastro de operadores";
                $public.operador = {};
            }

            $public.CargosSelecionados = [];

            FuncionarioFactory.getFuncionarios()
                .success(function (dados, status) {
                    $public.Funcionarios = dados;

                    //Editar
                    if (Operador) {

                        //Seleciona o Funcionario
                        angular.forEach($public.Funcionarios, function (item, index) {
                            if (item.FuncionarioID === Operador.FuncionarioID) {
                                $public.FuncionarioSelecionado = item;
                            }
                        });
                    }
                });

            GrupoAcessoFactory.getGrupoAcesso()
                .success(function (dados, status) {
                    $public.grupoAcesso = dados;

                    //Editar
                    if (Operador) {
                        //Seleciona o Grupo de Acesso
                        angular.forEach($public.grupoAcesso, function (item, index) {
                            if (item.LogGrupoAcessoID === Operador.LogGrupoAcessoID) {
                                $public.GrupoAcessoSelecionado = item;
                            }
                        });
                    }
                });

            CargoFactory.getCargo()
               .success(function (dados, status) {
                   $public.cargo = dados;

                   //Editar
                   if (Operador) {
                       //Seleciona o Funcionario
                       angular.forEach(Operador.Cargos, function (item, index) {
                           $public.CargosSelecionados.push(item.CargoID);
                       });
                   }
               });
        };
        $private.Init();
    }]);

    app.controller('OperadorListarController', ['OperadoresFactory', '$location', '$uibModal', 'toastr', '$window', function (OperadoresFactory, $location, $uibModal, toastr, $window) {

        var $public = this;
        var $private = {};

        $public.Relatorio = function () {
            OperadoresFactory.getRelatorio().success(function (response) {
                var blob = new Blob([response], { type: 'application/pdf' });

                if ($window.navigator.msSaveBlob) {
                    $window.navigator.msSaveBlob(blob, 'ListagemOperadores.pdf');
                } else {
                    var link = $window.URL.createObjectURL(blob);
                    $window.open(link, '_blank');
                }
            });
        };


        $public.Put = function (item) {
            $location.path('operador/editar/' + item.OperadorID);
        };

        $public.AbrirModal = function (item) {
            var modalInstance = $uibModal.open({
                templateUrl: 'ModalExcluirOperador.html',
                controllerAs: 'ctrl',
                resolve: { operador: function () { return item; } },
                controller: ['$uibModalInstance', 'OperadoresFactory', 'operador', function ($uibModalInstance, OperadoresFactory, operador) {
                    this.Operador = operador;
                    this.FecharModal = function () { $uibModalInstance.dismiss('cancel'); };
                    this.ConfirmarExcluir = function () { $uibModalInstance.close(); };
                }]
            });

            modalInstance.result.then(function () {
                OperadoresFactory.deleteOperadores(item.OperadorID)
                .success(function () {
                    toastr.success('Operador removido com sucesso !', 'Sucesso', { progressBar: true, timeOut: 3000 });
                    $private.Init();
                })
                .error(function (dados, status) {
                    switch (status) {
                        case 417:
                            toastr.warning('Operador está sendo utilizado em outras telas, não será permitido a exclusão!', 'Atenção', { progressBar: true, timeOut: 3000 });
                            break;
                        default:
                            toastr.error('Ocorreu um problema inesperado, entre em contato com o suporte técnico', 'Atenção', { progressBar: true, timeOut: 3000 });
                            break;
                    }
                });
            });
        };

        $private.Init = function () {

            OperadoresFactory.getOperadores()
                .success(function (dados, status) {
                    $public.Operadores = dados;
                })
                .error(function (status) { $location.path('Home'); });
        };
        $private.Init();
    }]);

})(window.app, window.angular);