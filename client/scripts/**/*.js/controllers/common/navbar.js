///<reference path="../../../../typings/angular.d.ts" />
/// <reference path="loginService.ts" />
///<reference path="_common.ts" />
var App;
(function (App) {
    function NavbarDirective() {
        return {
            restrict: 'E',
            templateUrl: '/scripts/controllers/common/navbar.html',
            scope: {},
            controller: 'navbarController',
            controllerAs: 'vm',
            bindToController: true
        };
    }
    App.NavbarDirective = NavbarDirective;
    var NavbarController = (function () {
        function NavbarController($scope, loginService) {
            this.$scope = $scope;
            this.loginService = loginService;
        }
        NavbarController.prototype.isSignedIn = function () {
            return this.loginService.getSignedIn();
        };
        NavbarController.$inject = ['$scope', 'loginService'];
        return NavbarController;
    }());
    App.NavbarController = NavbarController;
})(App || (App = {}));
angular.module("App.common")
    .controller("navbarController", App.NavbarController)
    .directive("navBar", App.NavbarDirective);
