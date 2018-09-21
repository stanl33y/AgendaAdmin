;(function (app, angular, undefined) {
    'use strict';

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/operador/cadastro", {
                controller: "OperadorController",
                controllerAs: "ctrl",
                templateUrl: "/Login/Operador/Cadastro",
                resolve: { Operador: function () { return undefined; }}
            })
            .when("/operador/editar/:Id", {
                controller: "OperadorController",
                controllerAs: "ctrl",
                templateUrl: "/Login/Operador/Cadastro",
                resolve: {
                    Operador: ['$q', '$route', '$location', 'OperadoresFactory', function ($q, $route, $location, OperadoresFactory) {
                        var deferred = $q.defer();

                        OperadoresFactory.getOperadoresById($route.current.params.Id)
                                .success(function (dados) { deferred.resolve(dados); })
                                .error(function () { $location.path('operador'); });

                        return deferred.promise;
                    }]
                }
            })
            .when("/operador", {
                controller: "OperadorListarController",
                controllerAs: "ctrl",
                templateUrl: "/Login/Operador/Index"
            });
    }]);
})(window.app, window.angular);