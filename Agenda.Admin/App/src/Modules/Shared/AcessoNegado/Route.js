;(function(app, angular, undefined) {
    'use strict';
    
	app.config(['$routeProvider', function ($routeProvider) {
	    $routeProvider.when("/acesso-negado", {
	        controller: "AcessoNegadoController",
	        controllerAs: "ctrl",
	        templateUrl: "/Home/AcessoNegado"
	    });
	}]);
})(window.app, window.angular);