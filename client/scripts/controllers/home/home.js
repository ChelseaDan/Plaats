function HomeDirective() {
    return {
        restrict: 'E',
        templateUrl: '/scripts/controllers/home/home.html',
        scope : {},
        controller: 'homeController',
        controllerAs: 'vm',
        bindToController: true
    };
}

function HomeController() {
    console.log("Constructed home controller");
}

angular.module("App.home")
.controller("homeController", HomeController)
.directive("home", HomeDirective);