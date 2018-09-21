;(function(app, angular, undefined) {
    'use strict';
    
	app.config(['$routeProvider', function ($routeProvider) {
	    $routeProvider.when("/alterar-senha", {
	        controller: "AlterarSenhaController",
	        controllerAs: "ctrl",
	        templateUrl: "/Account/AlterarSenha"
	    });
	}]);
})(window.app, window.angular);