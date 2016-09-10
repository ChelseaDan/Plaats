///<reference path="../../typings/angular.d.ts" />
var app = angular.module('App', [
    'ui.router',
    'App.common',
    'App.home',
    'angularSpinners'
]);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
        url: '/home',
        templateUrl: '/home'
    })
        .state("login", {
        url: "/login",
        templateUrl: "/login",
        controller: "loginController",
        controllerAs: "vm"
    })
        .state("properties", {
        url: "/properties",
        templateUrl: "/properties"
    })
        .state("upload", {
        url: "/about",
        templateUrl: "/home"
    });
});

///<reference path="../../../../typings/angular.d.ts" />
///<reference path="../../app.ts" />
var module = angular.module("App.common", ['angularSpinners']);

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
        function LoginController($scope, $http, spinnerService, loginService) {
            this.$scope = $scope;
            this.$http = $http;
            this.spinnerService = spinnerService;
            this.loginService = loginService;
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
            this.$http.post('/api/accounts/register', newUser, { withCredentials: true }).then(function (response) {
                _this.displaySpinner = false;
                _this.loginService.setSignedIn();
            }, function (err) {
                _this.displaySpinner = false;
            });
        };
        LoginController.prototype.submitLogInDetails = function () {
            var _this = this;
            this.displaySpinner = true;
            var existingUser = {
                emailAddress: this.emailAddress,
                password: this.password
            };
            this.$http.post('/api/accounts/login', existingUser, { withCredentials: true }).then(function (response) {
                _this.displaySpinner = false;
                _this.loginService.setSignedIn();
            }, function (err) {
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
        LoginController.$inject = ['$scope', '$http', 'spinnerService'];
        return LoginController;
    }());
    App.LoginController = LoginController;
})(App || (App = {}));
angular.module("App.common")
    .controller("loginController", App.LoginController)
    .directive("logIn", App.LoginDirective);

///<reference path="../../../../typings/angular.d.ts" />
///<reference path="_common.ts" />
var App;
(function (App) {
    var LoginService = (function () {
        function LoginService($scope, signedIn, token) {
            this.$scope = $scope;
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
        LoginService.inject = ['$scope'];
        return LoginService;
    }());
    App.LoginService = LoginService;
})(App || (App = {}));
angular.module("App.common")
    .service('loginService', App.LoginService);

///<reference path="../../../../typings/angular.d.ts" />
///<reference path="../../app.ts" />
var module = angular.module("App.home", []);

///<reference path="../../../../typings/angular.d.ts" />
///<reference path="_home.ts" />
var App;
(function (App) {
    var home;
    (function (home) {
        function HomeDirective() {
            return {
                restrict: 'E',
                templateUrl: '/scripts/controllers/home/home.html',
                scope: {},
                controller: 'homeController',
                controllerAs: 'vm',
                bindToController: true
            };
        }
        home.HomeDirective = HomeDirective;
        var HomeController = (function () {
            function HomeController() {
                console.log("Constructed home controller");
            }
            return HomeController;
        }());
        home.HomeController = HomeController;
    })(home = App.home || (App.home = {}));
})(App || (App = {}));
angular.module("App.home")
    .controller("homeController", App.home.HomeController)
    .directive("home", App.home.HomeDirective);
