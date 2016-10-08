
function LoginDirective() {
    return {
        restrict: 'E',
        templateUrl: '/scripts/controllers/common/login.html',
        scope: {},
        controller: 'loginController',
        controllerAs: 'vm',
        bindToController: true
    };
}

function LoginController($scope, $http, loginService, $location) {

    var self = this;
    //Presentation logic.
    self.signInSelected = true;
    self.logInSelected = false;
    //User details.
    self.firstName = "";
    self.lastName = "";
    self.emailAddress = "";
    self.password = "";
    self.displaySpinner = false;

    self.submitNewUserDetails = function () {
        self.displaySpinner = true;
        var newUser = {
            firstName: this.firstName,
            lastName: this.lastName,
            emailAddress: this.emailAddress,
            password: this.password
        }
        loginService.registerUser(newUser).then(function (reponse) {
            $location.url('/account');
        }, function (err) {
            console.log("error in registering so loading /login");
            $location.url('/login');
        }).finally(function () {
            self.displaySpinner = false;
        });
    }

    self.submitLogInDetails = function () {
        self.displaySpinner = true;
        var existingUser = {
            emailAddress: self.emailAddress,
            password: self.password
        }
        loginService.existingUser(existingUser).then(function (response) {
            $location.url('/account');
        }).finally(function () {
            self.displaySpinner = false;
        });
    }

    self.signedIn = function () {
        return loginService.getSignedIn();
    }

    self.signIn = function () {
        self.signInSelected = true;
        self.logInSelected = false;
    }

    self.logIn = function () {
        self.logInSelected = true;
        self.signInSelected = false;
    }
}
angular.module("App.common")
    .controller("loginController", ['$scope', '$http', 'loginService', '$location', LoginController])
    .directive("logIn", LoginDirective);