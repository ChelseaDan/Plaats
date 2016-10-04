///<reference path="../../typings/angular.d.ts" />
/// <reference path="../../node_modules/underscore/underscore.d.ts" />
var underscore = angular.module('underscore', []);
var app = angular.module('App', [
    'ui.router',
    'App.common',
    'App.home',
    'angularSpinners',
    'underscore'
]);
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
        url: '/home',
        templateUrl: '/home',
        controller: "homeController",
        controllerAs: "vm"
    })
        .state('properties', {
        url: '/properties',
        templateUrl: '/home',
        controller: "homeController",
        controllerAs: "vm"
    })
        .state('account', {
        url: '/account',
        templateUrl: '/account',
        controller: "accountController",
        controllerAs: "vm"
    })
        .state("login", {
        url: "/login",
        templateUrl: "/login",
        controller: "loginController",
        controllerAs: "vm"
    });
});

///<reference path="../../../../typings/angular.d.ts" />
///<reference path="../../app.ts" />
///<reference path="../common/loginService.ts" />
var App;
(function (App) {
    var AccountController = (function () {
        function AccountController($scope, loginService) {
            this.$scope = $scope;
            this.loginService = loginService;
        }
        AccountController.prototype.getMessages = function () {
            this.viewMessages = true;
            this.messages = [
                { id: 1, from: "sender1", title: "Hello world", content: "This is a message" },
                { id: 2, from: "sender2", title: "Hello world2", content: "This is the second message" },
                { id: 3, from: "sender3", title: "Hello world3", content: "This is the third message" },
            ];
            return this.messages;
        };
        AccountController.prototype.getMessageInfo = function (messageId) {
            this.viewEmailInfo = true;
            var filtered = _.filter(this.messages, function (message) {
                return message.id == messageId;
            });
            this.selectedMessage = filtered[0];
            console.log(this.selectedMessage);
        };
        AccountController.$inject = ['$scope', 'loginService'];
        return AccountController;
    }());
    App.AccountController = AccountController;
})(App || (App = {}));
angular.module("App")
    .controller("accountController", App.AccountController);

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
            return this.user;
        };
        LoginService.inject = ['$http'];
        return LoginService;
    }());
    App.LoginService = LoginService;
})(App || (App = {}));
angular.module("App.common")
    .service('loginService', App.LoginService);

///<reference path="../../../../typings/angular.d.ts" />
/// <reference path="loginService.ts" />
///<reference path="_common.ts" />
var App;
(function (App) {
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
    App.NavbarDirective = NavbarDirective;
    var NavbarController = (function () {
        function NavbarController($scope, loginService) {
            this.$scope = $scope;
            this.loginService = loginService;
        }
        NavbarController.prototype.isSignedIn = function () {
            return this.loginService.getSignedIn();
        };
        NavbarController.$inject = ['$scope', 'loginService'];
        return NavbarController;
    }());
    App.NavbarController = NavbarController;
})(App || (App = {}));
angular.module("App.common")
    .controller("navbarController", App.NavbarController)
    .directive("navBar", App.NavbarDirective);

var App;
(function (App) {
    var User = (function () {
        function User() {
        }
        return User;
    }());
    App.User = User;
})(App || (App = {}));

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
