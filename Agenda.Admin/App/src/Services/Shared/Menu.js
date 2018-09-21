;(function(app, angular, undefined) {
    'use strict';
	app.factory('MenuFactory', ['ServiceSettings','$http', function (ServiceSettings, $http) {
	    var dataFactory = {};

	    dataFactory.getMenus = function () {
	        return $http.get(ServiceSettings.ServiceMVCBase + '/menu/GetMenus');
	    };

	    dataFactory.getMenusCargo = function (id) {
	        return $http.get(ServiceSettings.ServiceMVCBase + '/menu/GetMenusCargo?CargoID=' + id);
	    };

	    dataFactory.getMenusAtalho = function () {
	        return $http.get(ServiceSettings.ServiceMVCBase + '/menu/GetMenusFavoritos');
	    };

	    dataFactory.UpdateMenusAtalho = function (dados) {
	        return $http.post(ServiceSettings.ServiceMVCBase + '/menu/UpdateFavoritos', dados);
	    };

	    return dataFactory;
	}]);
})(window.app, window.angular);