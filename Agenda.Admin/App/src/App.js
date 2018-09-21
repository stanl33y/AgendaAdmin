;(function (window, angular, undefined) {
    'use strict';

    var app = window.app || (window.app = angular.module('GestcomApp', [
        'ngRoute',
        'ngAnimate',
        'angular-loading-bar',
        'ui.bootstrap',
        'mwl.calendar',
        'checklist-model',
        'uiSwitch',
        'toastr',
        'ivh.treeview',
        'ui.utils.masks',
        'ui.mask',
        'idf.br-filters',
        'plupload.directive',
        'as.sortable',
        'ui.tinymce',
        'angular.viacep',
        'ngImgCrop',
        'angular-nicescroll'
    ]));

    app.constant('ServiceSettings', { ServiceBase: '/api/', ServiceMVCBase: 'api/mvc/' });

    //app.config(['$routeProvider', '$httpProvider', '$locationProvider', 'calendarConfigProvider', 'plUploadServiceProvider', function ($routeProvider, $httpProvider, $locationProvider, calendarConfigProvider, plUploadServiceProvider) {
    app.config(['$routeProvider', '$httpProvider', '$locationProvider', 'calendarConfig', 'plUploadServiceProvider', function ($routeProvider, $httpProvider, $locationProvider, calendarConfig, plUploadServiceProvider) {
        //Routes and Interceptors
        $routeProvider.caseInsensitiveMatch = true;
        $routeProvider.otherwise({ redirectTo: "/agenda" });
        $httpProvider.interceptors.push('RedirectInterceptor');

        //angular-bootstrap-calendar
        calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';
        calendarConfig.i18nStrings.eventsLabel = 'Eventos';

        //plupload
        plUploadServiceProvider.setConfig('flashPath', 'bower_components/plupload-angular-directive/dist/plupload.flash.swf');
        plUploadServiceProvider.setConfig('silverLightPath', 'bower_components/plupload-angular-directive/dist/plupload.silverlight.xap');

        //tinyMCE
        window.tinyMCE.baseURL = "/bower_components/tinymce/";
    }]);

    app.run(['$rootScope', '$templateCache', function ($rootScope, $templateCache) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (typeof (current) !== 'undefined') {
                $templateCache.remove(current.templateUrl);
            }
        });
    }]);

})(window, window.angular);