///<reference path="../../../../typings/angular.d.ts" />
///<reference path="_common.ts" />
var App;
(function (App) {
    var LoginService = (function () {
        function LoginService($http) {
            this.$http = $http;
            this.signedIn = false;
            this.token = "";
        }
        LoginService.prototype.registerUser = function (newUser) {
            var _this = this;
            return this.$http.post('/api/accounts/register', newUser, { withCredentials: true }).then(function (response) {
                console.log(response);
                _this.setSignedIn();
            }, function (err) {
                console.log("registerUser error occurred.");
            });
        };
        LoginService.prototype.existingUser = function (existingUser) {
            var _this = this;
            return this.$http.post('/api/accounts/login', existingUser, { withCredentials: true }).then(function (response) {
                console.log(response);
                _this.setSignedIn();
            }, function (err) {
                console.log("existingUser error occurred.");
            });
        };
        LoginService.prototype.setSignedIn = function () {
            this.signedIn = true;
        };
        LoginService.prototype.getSignedIn = function () {
            return this.signedIn;
        };
        LoginService.prototype.setToken = function (token) {
            this.token = token;
        };
        LoginService.prototype.getToken = function () {
            return this.token;
        };
        LoginService.prototype.getUser = function () {
            return { userName: "Daniel Graaf", emailAddress: "dan.graaf@yahoo.co.uk" };
        };
        LoginService.inject = ['$http'];
        return LoginService;
    }());
    App.LoginService = LoginService;
})(App || (App = {}));
angular.module("App.common")
    .service('loginService', App.LoginService);
