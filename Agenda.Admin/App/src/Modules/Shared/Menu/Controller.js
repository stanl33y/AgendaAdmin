;(function(app, angular, undefined) {
    'use strict';
    
    app.controller('MenuController', ['$interval', '$filter', '$http', '$window', function ($interval, $filter, $http, $window) {
        var $public = this;
        var $private = {};

	    $public.Logoff = function () {
	        $http.post('/Account/Logoff').then(function () {
	            $window.location = "/Account/Login";
	        });
	    };
        

	    $private.Init = function () {
;
	    };

	    $private.Init();
    }]);

})(window.app, window.angular);