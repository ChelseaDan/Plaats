angular.module('App', [
    'ui.router',
    'App.common',
    'App.home',
    'angularSpinners',
    'underscore',
    'ui.bootstrap',
    'dropzone'
]).config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home',
            controller: "homeController",
            controllerAs: "vm"
        })
        .state('search', {
            url: '/search',
            templateUrl: '/search',
            controller: "searchController",
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
///<reference path="../../typings/angular.d.ts" />
///<reference path="../../node_modules/underscore/underscore.d.ts" />
///<reference path="../../typings/index.d.ts" />
"use strict";
var underscore = angular.module('underscore', []);
var dropzone1 = angular.module('dropzone', []);
require("dropzone");
var app = angular.module('App', [
    'ui.router',
    'App.common',
    'App.home',
    'angularSpinners',
    'underscore',
    'ui.bootstrap',
    'dropzone'
]);
app.directive("dropzone", function () {
    return function (scope, element, attrs) {
        var config, dropzone;
        config = scope["vm"]["$scope"]["dropzoneConfig"];
        //console.log(Dropzone);
        // create a Dropzone for the element with the given options
        dropzone = new Dropzone(element[0], config.options);
        // bind the given event handlers
        angular.forEach(config.eventHandlers, function (handler, event) {
            dropzone.on(event, handler);
        });
    };
});
app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
        url: '/home',
        templateUrl: '/home',
        controller: "homeController",
        controllerAs: "vm"
    })
        .state('search', {
        url: '/search',
        templateUrl: '/search',
        controller: "searchController",
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

function AccountController($scope, loginService) {
    var self = this;
    self.$scope = $scope;
    self.loginService = loginService;
    self.user = loginService.getUser();

    self.getMessages = function () {
        self.resetAllViews();
        self.viewMessages = true;
        self.messages = {
            Person1: [{ sent: true, content: "test123" }, { sent: false, content: "received123" }],
            Person2: [{ sent: false, content: "Would you like some help with interiors?" }, { sent: true, content: "Yes please!" }]
        };
        self.allSenders = _.keys(self.messages);
        return self.messages;
    };
    self.getMessageInfo = function (senderName) {
        self.viewEmailInfo = true;
        self.selectedSender = senderName;
        self.selectedConversation = self.messages[senderName];
    };
    self.getAccountInfo = function () {
        self.resetAllViews();
        self.viewAccountInfo = true;
        self.user = self.loginService.getUser();
    };
    self.resetAllViews = function () {
        self.viewAccountInfo = false;
        self.viewEmailInfo = false;
        self.viewMessages = false;
    };
    self.sendMessage = function () {
        if (self.newMessage && self.newMessage.length > 0) {
            self.selectedConversation.push({ sent: true, content: self.newMessage });
            self.newMessage = "";
        }
    };
}

angular.module("App")
    .controller("accountController", ['$scope', 'loginService', AccountController]);
angular.module("App.common", ['angularSpinners']);

    function LoginDirective() {
        return {
            restrict: 'E',
            templateUrl: '/scripts/controllers/common/login.html',
            scope : {},
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

        self.submitNewUserDetails = function() {
            self.displaySpinner = true;
            var newUser = {
                firstName: this.firstName,
                lastName: this.lastName, 
                emailAddress: this.emailAddress,
                password: this.password
            }
            loginService.registerUser(newUser).then(function(reponse) {
                $location.url('/account');
            }, function(err) {
                console.log("error in registering so loading /login");
                $location.url('/login');
            }).finally(function(){
                self.displaySpinner = false;
            });
        }

        self.submitLogInDetails = function() {
            self.displaySpinner = true;
            var existingUser = {
                emailAddress: self.emailAddress,
                password: self.password
            }
            loginService.existingUser(existingUser).then(function(response) {
                $location.url('/account');
            }).finally(function(){
                self.displaySpinner = false;
            });
        }

        self.signedIn = function() {
            return loginService.getSignedIn();
        }

        self.signIn = function() {
            self.signInSelected = true;
            self.logInSelected = false;
        }

        self.logIn = function() {
            self.logInSelected = true;
            self.signInSelected = false;
        }
    }
}
angular.module("App.common")
.controller("loginController", ['$scope', '$http', 'loginService', '$location', LoginController])
.directive("logIn", LoginDirective);
function LoginService($http) {

        var signedIn = false;

        return {
            registerUser: registerUser,
            existingUser: existingUser,
            getSignedIn: getSignedIn,
            getUser: getUser
        }

        function registerUser(newUser) {
            return $http.post('/api/accounts/register', newUser, {withCredentials: true}).then(function(response) {
                console.log(response);
                setSignedIn();
            }, function(err) {
                console.log("registerUser error occurred.");
            });
        }

        function existingUser(existingUser) {
            return $http.post('/api/accounts/login', existingUser, {withCredentials: true}).then(function(response) {
                console.log(response);
                setSignedIn();
            }, function(err) {
                console.log("existingUser error occurred.");
            });
        }

        function setSignedIn() {
            this.signedIn = true;
        }

        function getSignedIn() {
            return this.signedIn;
        }

        function getUser() {
            return {userName: "Daniel Graaf", emailAddress: "dan.graaf@yahoo.co.uk"};
        }
    }
}
angular.module("App.common")
    .service('loginService', ['$http', LoginService]);
function NavbarDirective() {
    return {
        restrict: 'E',
        templateUrl: '/scripts/controllers/common/navbar.html',
        scope : {},
        controller: 'navbarController',
        controllerAs: 'vm',
        bindToController: true
    };
}

function NavbarController($scope, loginService) {
        $self.isSignedIn = function() {
            return loginService.getSignedIn();
        }
    }
}
angular.module("App.common")
.controller("navbarController", ['$scope', 'loginService', NavbarController])
.directive("navBar", NavbarDirective);
angular.module("App.home", []);
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
function SearchController() {

}
angular.module("App")
.controller("searchController", SearchController);
///<reference path="../../../../typings/angular.d.ts" />
///<reference path="../../app.ts" />
///<reference path="../common/loginService.ts" />
var App;
(function (App) {
    var AccountController = (function () {
        function AccountController($scope, loginService) {
            this.$scope = $scope;
            this.loginService = loginService;
            this.user = this.loginService.getUser();
        }
        AccountController.prototype.getMessages = function () {
            this.resetAllViews();
            this.viewMessages = true;
            this.messages = {
                Person1: [{ sent: true, content: "test123" }, { sent: false, content: "received123" }],
                Person2: [{ sent: false, content: "Would you like some help with interiors?" }, { sent: true, content: "Yes please!" }]
            };
            this.allSenders = _.keys(this.messages);
            return this.messages;
        };
        AccountController.prototype.getMessageInfo = function (senderName) {
            this.viewEmailInfo = true;
            this.selectedSender = senderName;
            this.selectedConversation = this.messages[senderName];
        };
        AccountController.prototype.getAccountInfo = function () {
            this.resetAllViews();
            this.viewAccountInfo = true;
            this.user = this.loginService.getUser();
        };
        AccountController.prototype.resetAllViews = function () {
            this.viewAccountInfo = false;
            this.viewEmailInfo = false;
            this.viewMessages = false;
        };
        AccountController.prototype.sendMessage = function () {
            if (this.newMessage && this.newMessage.length > 0) {
                this.selectedConversation.push({ sent: true, content: this.newMessage });
                this.newMessage = "";
            }
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
            return { userName: "Daniel Graaf", emailAddress: "dan.graaf@yahoo.co.uk" };
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

///<reference path="../../../../typings/angular.d.ts" />
///<reference path="../../app.ts" />
var App;
(function (App) {
    var SearchController = (function () {
        function SearchController($scope) {
            this.$scope = $scope;
            $scope.dropzoneConfig = {
                'options': {
                    'url': 'upload.php'
                },
                'eventHandlers': {
                    'sending': function (file, xhr, formData) {
                    },
                    'success': function (file, response) {
                    }
                }
            };
        }
        SearchController.$inject = ['$scope'];
        return SearchController;
    }());
    App.SearchController = SearchController;
})(App || (App = {}));
angular.module("App")
    .controller("searchController", App.SearchController);
