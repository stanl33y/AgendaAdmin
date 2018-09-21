;(function(app, angular, undefined) {
    'use strict';

	app.factory('AgendaFactory', ['ServiceSettings','$http', function (ServiceSettings, $http) {
	    var dataFactory = {};

	    dataFactory.getCalendar = function () {
	        return $http.get(ServiceSettings.ServiceBase + '/Agenda');
	    };

	    dataFactory.getAgendaByID = function (id) {
	        return $http.get(ServiceSettings.ServiceBase + '/Agenda/' + id);
	    };

	    dataFactory.getRelatorio = function (vm) {
	        return $http.post(ServiceSettings.ServiceMVCBase + '/Agenda/Report', vm, { responseType: 'arraybuffer' });
	    };

	    dataFactory.InsertAgenda = function (vm) {
	        return $http.post(ServiceSettings.ServiceMVCBase + '/Agenda/AddCompromisso', vm);
	    };

	    dataFactory.UpdateAgenda = function (vm) {
	        return $http.put(ServiceSettings.ServiceBase + '/Agenda', vm);
	    };

	    dataFactory.DeleteAgenda = function (id) {
	        return $http.delete(ServiceSettings.ServiceBase + '/Agenda/' + id);
	    };

	    return dataFactory;
	}]);
})(window.app, window.angular);