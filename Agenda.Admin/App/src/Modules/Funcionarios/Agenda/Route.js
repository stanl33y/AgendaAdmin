;(function(app, angular, undefined) {
    'use strict';
    
	app.config(['$routeProvider', function ($routeProvider) {
	    $routeProvider
            .when("/Agenda", {
                controller: "AgendaController",
                controllerAs: "ctrl",
                templateUrl: "/Funcionarios/Agenda"
            })
            .when("/Agenda/Relatorio", {
                controller: "AgendaRelatorioController",
                controllerAs: "ctrl",
                templateUrl: "/Funcionarios/Agenda/Relatorio"
            });
	}]);
})(window.app, window.angular);