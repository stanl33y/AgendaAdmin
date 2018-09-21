;(function (app, angular, undefined) {
    'use strict';

    app.factory('AuthFactory', ['$http', function ($http) {

        var urlBase = "/Account";

        var dataFactory = {};

        dataFactory.ChangePassword = function (item) {
            return $http.post(urlBase + '/AlterarSenha', item);
        };

        return dataFactory;
    }]);

})(window.app, window.angular);