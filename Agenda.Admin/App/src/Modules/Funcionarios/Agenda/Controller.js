;(function (app, angular, undefined) {
    'use strict';

    app.controller('AgendaController', ['toastr', '$uibModal', 'calendarConfig', 'AgendaFactory', function (toastr, $uibModal, calendarConfig, AgendaFactory) {
        var $public = this;
        var $private = {};

        $public.Calendar = {
            View: 'month',
            CurrentDay: new Date(),
            Events: [],
            Title: 'Agenda',
            onEventClick: function (calendarEvent) {
                AgendaFactory.getAgendaByID(calendarEvent.AgendaID)
                    .success(function (data, status) { $public.AbrirModal(data, calendarEvent.editable); })
                    .error(function (data, status) { toastr.error('Compromisso não encontrado, Verifique!', 'Atenção', { progressBar: true, timeOut: 3000 }); });
            },
            onEventTimesChanged: function (calendarEvent, calendarNewEventStart, calendarNewEventEnd) {
                AgendaFactory.getAgendaByID(calendarEvent.AgendaID)
                    .success(function (data, status) {
                        var vm = { Agenda: angular.copy(data.Agenda), Funcionarios: [] };
                        vm.Agenda.DataInicio = calendarNewEventStart;
                        vm.Agenda.DataFim = calendarNewEventEnd;
                        vm.Funcionarios = data.Funcionarios;
                        AgendaFactory.UpdateAgenda(vm)
                            .success(function () {
                                calendarEvent.startsAt = calendarNewEventStart;
                                calendarEvent.endsAt = calendarNewEventEnd;
                                toastr.success('Horário Ajustado!', 'Sucesso', { progressBar: true, timeOut: 3000 });
                            })
                            .error(function () { toastr.error('Ocorreu um erro ao atualizar o compromisso!', 'Atenção', { progressBar: true, timeOut: 3000 }); });
                    })
                    .error(function (data, status) { toastr.error('Compromisso não encontrado, Verifique!', 'Atenção', { progressBar: true, timeOut: 3000 }); });
            },
            onEventEdit: function (calendarEvent) { this.onEventClick(calendarEvent); },
            onEventDelete: function (calendarEvent) { $private.AbrirModalDelete(calendarEvent); },
            onTimespanClick: function (calendarEvent) { }
        };

        $public.AbrirModal = function (item, editable) {
            var modalInstance = $uibModal.open({
                templateUrl: '/Funcionarios/Agenda/Gerenciar',
                controller: 'AgendaGerenciarController',
                controllerAs: 'ctrl',
                size: 'lg',
                resolve: {
                    Agenda: function () { return angular.copy(item); }
                }
            });

            modalInstance.result.then(function (agenda) {
                if (item) {
                    angular.forEach($public.Calendar.Events, function (evento, index) {
                        if (evento.AgendaID === item.Agenda.AgendaID) { $public.Calendar.Events[index] = $private.MontaObjetoCalendarEvent(agenda); }
                    });
                    toastr.success('Compromisso alterado!', 'Sucesso', { progressBar: true, timeOut: 3000 });
                } else {
                    $public.Calendar.Events.push($private.MontaObjetoCalendarEvent(agenda));
                    toastr.success('Compromisso adicionado!', 'Sucesso', { progressBar: true, timeOut: 3000 });
                }
            });
        };

        $private.AbrirModalDelete = function (item) {
            var modalInstance = $uibModal.open({
                templateUrl: 'ModalExcluirAgenda.html',
                controllerAs: 'ctrl',
                resolve: { Agenda: function () { return item; } },
                controller: ['$uibModalInstance', 'Agenda', function ($uibModalInstance, Agenda) {
                    this.Agenda = Agenda;
                    this.FecharModal = function () { $uibModalInstance.dismiss('cancel'); };
                    this.ConfirmarExcluir = function () { $uibModalInstance.close(); };
                }]
            });

            modalInstance.result.then(function () {
                AgendaFactory.DeleteAgenda(item.AgendaID)
                .success(function (dados, status) {
                    toastr.success('Compromisso removido com sucesso', 'Sucesso', { progressBar: true, timeOut: 2000 });
                    var index = $public.Calendar.Events.indexOf(item);
                    $public.Calendar.Events.splice(index, 1);
                })
                .error(function (dados, status) {
                    switch (status) {
                        case 404:
                            toastr.error('Compromisso não encontrado, Verifique!', 'Atenção', { progressBar: true, timeOut: 3000 });
                            break;
                        default:
                            toastr.error('Erro ao excluir o registro, verifique se o mesmo não esta vinculado com outra tabela', 'Atenção', { progressBar: true, timeOut: 4000 });
                            break;
                    }
                });
            });
        };

        $private.MontaObjetoCalendarEvent = function (item) {
            item.startsAt = new Date(item.startsAt);
            item.endsAt = new Date(item.endsAt);

            switch (item.type) {
                case 'important': item.color = calendarConfig.colorTypes.important; break;
                case 'warning': item.color = calendarConfig.colorTypes.warning; break;
                case 'info': item.color = calendarConfig.colorTypes.info; break;
                case 'inverse': item.color = calendarConfig.colorTypes.inverse; break;
                case 'success': item.color = calendarConfig.colorTypes.success; break;
                case 'special': item.color = calendarConfig.colorTypes.special; break;
            }

            item.actions = [];

            if (item.editable) {
                item.actions.push({ label: '<i class=\'fa fa-pencil\'></i>', onClick: function (args) { $public.Calendar.onEventEdit(args.calendarEvent); } });
            }

            if (item.deletable) {
                item.actions.push({ label: '<i class=\'fa fa-times\'></i>', onClick: function (args) { $public.Calendar.onEventDelete(args.calendarEvent); } });
            }

            return item;
        };

        $private.Init = function () {
            AgendaFactory.getCalendar()
                .success(function (data, status) {
                    angular.forEach(data, function (item, index) {
                        $public.Calendar.Events.push($private.MontaObjetoCalendarEvent(item));
                    });
                })
                .error(function (data, status) {
                    toastr.error('Erro ao recuperar dados do servidor!', 'Atenção', { progressBar: true, timeOut: 3000 });
                });
        };

        $private.Init();
    }]);

    app.controller('AgendaGerenciarController', ['$filter', 'toastr', '$uibModalInstance', 'AgendaFactory', 'Agenda', function ($filter, toastr, $uibModalInstance, AgendaFactory, Agenda) {
        var $public = this;
        var $private = {};

        $public.AbrirDatePicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();
            $public.DatePickerDataInicio = false;
            $public.DatePickerDataFim = false;
            $public[name] = true;
        };

        $public.Marcadores = [
            { Name: "Vermelho", Value: "important" },
            { Name: "Amarelo", Value: "warning" },
            { Name: "Azul", Value: "info" },
            { Name: "Preto", Value: "inverse" },
            { Name: "Verde", Value: "success" },
            { Name: "Roxo", Value: "special" }
        ];


        $public.ValidaDatas = function () {
            return ($public.Agenda.DataInicio.getTime() < $public.Agenda.DataFim.getTime());
        };

        $public.Enviar = function () {
                var vm = { Agenda: angular.copy($public.Agenda), Funcionarios: [] };
                vm.Agenda.Marcador = $public.MarcadorSelecionado.Value;

                if (Agenda) {
                    AgendaFactory.UpdateAgenda(vm)
                        .success(function (dados, status) { $private.RetornaModal($public.Agenda.AgendaID); })
                        .error(function (dados, status) { $private.MostrarErros(status); });
                } else {
                    AgendaFactory.InsertAgenda(vm)
                        .success(function (dados, status) { $private.RetornaModal(dados.AgendaID); })
                        .error(function (dados, status) { $private.MostrarErros(status); });
                }
        };

        $private.RetornaModal = function (id) {
            var dados = { AgendaID: id, title: $public.Agenda.Titulo, type: $public.MarcadorSelecionado.Value, startsAt: $public.Agenda.DataInicio, endsAt: $public.Agenda.DataFim, editable: true, deletable: true, draggable: true, resizable: true, incrementsBadgeTotal: true };
            $uibModalInstance.close(dados);
        };

        $private.MostrarErros = function (status) {
            switch (status) {
                case 404:
                    toastr.error('Compromisso não encontrado, Verifique!', 'Atenção', { progressBar: true, timeOut: 3000 });
                    break;
                case 406:
                    toastr.error('Verifique o preenchimento de todos os campos', 'Atenção', { progressBar: true, timeOut: 3000 });
                    break;
                default:
                    toastr.error('Verifique o preenchimento de todos os campos', 'Atenção', { progressBar: true, timeOut: 3000 });
                    break;
            }
        };

        $public.FecharModal = function () { $uibModalInstance.dismiss('cancel'); };

        $private.Init = function () {
            
            if (Agenda) {
                $public.Agenda = Agenda.Agenda;
                $public.Title = 'Editar compromisso';
                angular.forEach($public.Marcadores, function (item, index) { if (item.Value === $public.Agenda.Marcador) { $public.MarcadorSelecionado = item; } });
                $public.Agenda.DataInicio = new Date($public.Agenda.DataInicio);
                $public.Agenda.DataFim = new Date($public.Agenda.DataFim);

            } else {
                $public.Agenda = {};
                $public.Title = 'Cadastro de compromissos';
                $public.MarcadorSelecionado = $public.Marcadores[0];
                $public.Agenda.DataInicio = new Date();
                $public.Agenda.DataFim = new Date();
                $public.Agenda.DataFim.setMinutes($public.Agenda.DataFim.getMinutes() + 60); //Adiciona 1hora na data final
            }
        };

        $private.Init();
    }]);

})(window.app, window.angular);