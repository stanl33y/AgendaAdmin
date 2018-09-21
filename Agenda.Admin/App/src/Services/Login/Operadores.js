;(function(app, angular, undefined) {
    'use strict';
	app.factory('OperadoresFactory', ['ServiceSettings','$http', function (ServiceSettings, $http) {
	    var dataFactory = {};

	    dataFactory.getOperadores = function () {
	        return $http.get(ServiceSettings.ServiceBase + '/Operadores');
	    };

	    dataFactory.getOperadoresById = function (id) {
	        return $http.get(ServiceSettings.ServiceBase + '/Operadores/' + id);
	    };

	    dataFactory.deleteOperadores = function (id) {
	        return $http.delete(ServiceSettings.ServiceBase + '/Operadores/' + id);
	    };

	    dataFactory.PostOperador = function (operador, cargos) {
	        return $http.post(ServiceSettings.ServiceMVCBase + '/Operadores/AddOperador', { 'operador': operador, 'cargos': cargos });
	    };

	    dataFactory.getRelatorio = function (vm) {
	        return $http.post(ServiceSettings.ServiceMVCBase + '/Operadores/Report', vm, { responseType: 'arraybuffer' });
	    };

	    dataFactory.PutOperador = function (operador, cargos) {
	        return $http.put(ServiceSettings.ServiceBase + '/Operadores', { 'operador': operador, 'cargos': cargos });
	    };
	    return dataFactory;
	}]);
})(window.app, window.angular);