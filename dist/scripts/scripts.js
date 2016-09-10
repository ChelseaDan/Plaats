///<reference path="../../typings/angular.d.ts" />
var app = angular.module('App', [
    'ui.router',
    'App.common',
    'App.home'
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
var module = angular.module("App.common", []);

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
            this.$http.post('/api/accounts/register', newUser, { withCredentials: true }).then(function (response) {
                console.log(response);
            });
        };
        LoginController.prototype.submitLogInDetails = function () {
            this.displaySpinner = true;
            this.signedIn = true;
            var existingUser = {
                emailAddress: this.emailAddress,
                password: this.password
            };
            this.$http.post('/api/accounts/login', existingUser, { withCredentials: true }).then(function (response) {
                console.log(response);
            });
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
