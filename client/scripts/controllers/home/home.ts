///<reference path="../../../../typings/angular.d.ts" />
///<reference path="_home.ts" />
module App.home {
    export function HomeDirective(): ng.IDirective {
        return {
            restrict: 'E',
            templateUrl: '/scripts/controllers/home/home.html',
            scope : {},
            controller: 'homeController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

    export class HomeController {
        public constructor() {
            console.log("Constructed home controller");
        }
    }
}
angular.module("App.home")
.controller("homeController", App.home.HomeController)
.directive("home", App.home.HomeDirective);