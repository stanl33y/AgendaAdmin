;(function(app, angular, undefined) {
    'use strict';
    
    app.controller('HomeController', [function () {
	    var $public = this;
	    var $private = {};
    }]);

    app.controller('FavoritosController', ['$location', 'toastr', 'MenuFactory', function ($location, toastr, MenuFactory) {
        var $public = this;
        var $private = {};

        $public.Enviar = function () {
            var MenusSelecionados = $private.GetMenusSelecionados($public.Menus, true);

            MenuFactory.UpdateMenusAtalho(MenusSelecionados)
                .success(function (dados, status) {
                    toastr.success('Dados registrados com sucesso !', 'Sucesso', { progressBar: true, timeOut: 3000 });
                    $location.path('Home');
                })
                .error(function (dados, status) {
                    toastr.error('Verifique o preenchimento de todos os campos', 'Atenção', { progressBar: true, timeOut: 3000 });
                });
        };

        $private.GetMenusSelecionados = function (itens, zerar) {
            if (zerar) {
                $private.MenusSelecionados = [];
            }

            angular.forEach(itens, function (item, index) {
                if (item.MenusFilhos.length === 0 && item.Selecionado) {
                    $private.MenusSelecionados.push(item.MenuID);
                }

                if (item.MenusFilhos.length > 0) {
                    $private.GetMenusSelecionados(item.MenusFilhos, false);
                }
            });

            return $private.MenusSelecionados;
        };

        $private.Init = function () {
            MenuFactory.getMenusAtalho()
                .success(function (dados, status) { $public.Menus = dados; });
        };

        $private.Init();
    }]);
})(window.app, window.angular);