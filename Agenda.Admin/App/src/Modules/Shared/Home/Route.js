;(function(app, angular, undefined) {
    'use strict';
    
	app.config(['$routeProvider', function ($routeProvider) {
	    $routeProvider
            .when("/home", {
	            controller: "HomeController",
	            controllerAs: "ctrl",
	            templateUrl: "/Home/Inicio"
            })
            .when("/favoritos", {
                controller: "FavoritosController",
                controllerAs: "ctrl",
                templateUrl: "/Home/Favoritos"
            });
	}]);
})(window.app, window.angular);