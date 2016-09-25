///<reference path="../../../../typings/angular.d.ts" />
/// <reference path="loginService.ts" />
///<reference path="_common.ts" />
module App {
    export function NavbarDirective(): ng.IDirective {
        return {
            restrict: 'E',
            templateUrl: '/scripts/controllers/common/navbar.html',
            scope : {},
            controller: 'navbarController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

    export class NavbarController {

        static $inject = ['$scope', 'loginService'];

        public constructor(
        private $scope: ng.IScope,
        private loginService: LoginService) {
        }

        public isSignedIn() {
            return this.loginService.getSignedIn();
        }

    }
}
angular.module("App.common")
.controller("navbarController", App.NavbarController)
.directive("navBar", App.NavbarDirective);