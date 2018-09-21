;(function(app, angular, undefined) {
    'use strict';
    
    app.controller('AlterarSenhaController', ['$window', '$scope', '$location', '$timeout', 'AuthFactory', 'toastr', 'FuncionarioFactory', function ($window, $scope, $location, $timeout, AuthFactory, toastr, FuncionarioFactory) {
        var $public = this;
        var $private = {};

        $public.ValidaSenha = function () {
            if (!$public.ResetPassword.NovaSenha || $public.ResetPassword.NovaSenha.length < 6) {
                return false;
            }

            return ($public.ResetPassword.NovaSenha && $public.ResetPassword.NovaSenha === $public.ResetPassword.ConfirmarNovaSenha);
        };

        $public.Enviar = function () {
            $public.isLoading = true;
            AuthFactory.ChangePassword($public.ResetPassword)
                .success(function () {
                    toastr.success('Senha alterada com sucesso', 'Sucesso', { progressBar: true, timeOut: 2000 } );
                    $location.path('Home');
                })
                .error(function (data, status) {
                    switch (status) {
                        case 404:
                            toastr.error('Senha atual inválida', 'Atenção', { progressBar: true, timeOut: 3000 });
                            break;
                        case 406:
                            toastr.error('Verifique o preenchimento de todos os campos', 'Atenção', { progressBar: true, timeOut: 3000 });
                            break;
                        default:
                            toastr.warning('A Senha deve conter no mínimo 6 digitos e caracteres maiúsculo, minúsculo, especiais e números', 'Atenção', { progressBar: true, timeOut: 3000 });
                            break;
                    }
                    $private.Init();
                });
        };

        $public.SalvarImagem = function () {
            FuncionarioFactory.PostImagem({ Imagem: $public.myCroppedImage })
               .success(function () {
                   toastr.success('Imagem alterada com sucesso', 'Sucesso', { progressBar: true, timeOut: 2000 });
                   $window.location = '/';
               })
               .error(function (data, status) {

                   toastr.error('Problema, entre em contato com o suporte', 'Atenção', { progressBar: true, timeOut: 3000 });
               });

            $private.Init();
        };

         var handleFileSelect = function (evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function () {
                    $public.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };

         angular.element(document).ready(function () {
             angular.element('#fileInput').on('change', handleFileSelect);
         });

        $private.Init = function () {
            $public.myImage = '';
            $public.myCroppedImage = '';
            $public.isLoading = false;
            $public.ResetPassword = {};
            $public.ResetPassword.NovaSenha = '';
            $public.ResetPassword.ConfirmarNovaSenha = '';
        };

        $private.Init();

	}]);
})(window.app, window.angular);