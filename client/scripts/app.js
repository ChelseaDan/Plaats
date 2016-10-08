var underscore = angular.module('underscore', []);
var dropzone = angular.module('dropzone', []);

angular.module('App', [
    'ui.router',
    'App.common',
    'App.home',
    'angularSpinners',
    'underscore',
    'ui.bootstrap',
    'dropzone'
]).directive('dropzone', function () {
  return function (scope, element, attrs) {
    var config, dropzone;

    config = scope.dropzoneConfig;

    // create a Dropzone for the element with the given options
    dropzone = new Dropzone(element[0], config.options);

    // bind the given event handlers
    angular.forEach(config.eventHandlers, function (handler, event) {
      dropzone.on(event, handler);
    });
  };
}).config(function($stateProvider, $urlRouterProvider) {
    
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