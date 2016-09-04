///<reference path="../../../../typings/angular.d.ts" />
///<reference path="_common.ts" />
var App;
(function (App) {
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
    App.LoginDirective = LoginDirective;
    var LoginController = (function () {
        function LoginController($scope, $http) {
            this.$scope = $scope;
            this.$http = $http;
            this.signedIn = false;
            this.logInSelected = false;
            this.signInSelected = true;
        }
        LoginController.prototype.submitNewUserDetails = function () {
            this.signedIn = true;
            var newUser = {
                firstName: this.firstName,
                lastName: this.lastName,
                emailAddress: this.emailAddress,
                password: this.password
            };
            this.$http.post('/api/accounts/', newUser, { withCredentials: true }).then(function (response) {
            });
        };
        LoginController.prototype.submitLogInDetails = function () {
            this.displaySpinner = true;
            console.log("submitting log in details");
        };
        LoginController.prototype.signIn = function () {
            this.signInSelected = true;
            this.logInSelected = false;
            console.log("Sign in selected: " + this.signInSelected);
            console.log("log in selected: " + this.logInSelected);
        };
        LoginController.prototype.logIn = function () {
            this.logInSelected = true;
            this.signInSelected = false;
            console.log("Sign in selected: " + this.signInSelected);
            console.log("log in selected: " + this.logInSelected);
        };
        LoginController.$inject = ['$scope', '$http'];
        return LoginController;
    }());
    App.LoginController = LoginController;
})(App || (App = {}));
angular.module("App.common")
    .controller("loginController", App.LoginController)
    .directive("logIn", App.LoginDirective);
