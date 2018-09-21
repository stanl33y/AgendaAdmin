;(function (app, angular, undefined) {
    'use strict';

    app.factory('RedirectInterceptor', ['$rootScope', '$q', '$location', function ($rootScope, $q, $location) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                config.headers['X-Requested-With'] = 'XMLHttpRequest';
                return config;
            },

            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/acesso-negado');
                    return $q.reject(response);
                } else if (response.status === 503) {
                    window.location = "/Account/Login";
                    return $q.reject(response);
                }

                return $q.reject(response);
            }
        };
    }]);

})(window.app, window.angular);