///<reference path="../../../../typings/angular.d.ts" />
///<reference path="loginService.ts" />
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
        function LoginController($scope, $http, loginService, $location) {
            this.$scope = $scope;
            this.$http = $http;
            this.loginService = loginService;
            this.$location = $location;
            this.logInSelected = false;
            this.signInSelected = true;
            this.displaySpinner = false;
        }
        LoginController.prototype.submitNewUserDetails = function () {
            var _this = this;
            this.displaySpinner = true;
            var newUser = {
                firstName: this.firstName,
                lastName: this.lastName,
                emailAddress: this.emailAddress,
                password: this.password
            };
            this.loginService.registerUser(newUser).then(function (reponse) {
                _this.$location.url('/account');
            }, function (err) {
                console.log("error in registering so loading /login");
                _this.$location.url('/login');
            }).finally(function () {
                this.displaySpinner = false;
            });
        };
        LoginController.prototype.submitLogInDetails = function () {
            var _this = this;
            this.displaySpinner = true;
            var existingUser = {
                emailAddress: this.emailAddress,
                password: this.password
            };
            this.loginService.existingUser(existingUser).then(function (response) {
                _this.$location.url('/account');
            }).finally(function () {
                this.displaySpinner = false;
            });
        };
        LoginController.prototype.signedIn = function () {
            return this.loginService.getSignedIn();
        };
        LoginController.prototype.signIn = function () {
            this.signInSelected = true;
            this.logInSelected = false;
        };
        LoginController.prototype.logIn = function () {
            this.logInSelected = true;
            this.signInSelected = false;
        };
        LoginController.$inject = ['$scope', '$http', 'loginService', '$location'];
        return LoginController;
    }());
    App.LoginController = LoginController;
})(App || (App = {}));
angular.module("App.common")
    .controller("loginController", App.LoginController)
    .directive("logIn", App.LoginDirective);
