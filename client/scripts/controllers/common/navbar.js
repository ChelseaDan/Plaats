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

function NavbarController($scope, loginService) {
    self.isSignedIn = function () {
        return loginService.getSignedIn();
    }
}
angular.module("App.common")
    .controller("navbarController", ['$scope', 'loginService', NavbarController])
    .directive("navBar", NavbarDirective);