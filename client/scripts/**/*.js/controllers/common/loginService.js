///<reference path="../../../../typings/angular.d.ts" />
///<reference path="_common.ts" />
var App;
(function (App) {
    var LoginService = (function () {
        function LoginService() {
            this.signedIn = false;
            this.token = "";
        }
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
        LoginService.inject = [];
        return LoginService;
    }());
    App.LoginService = LoginService;
})(App || (App = {}));
angular.module("App.common")
    .service('loginService', App.LoginService);
