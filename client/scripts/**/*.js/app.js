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
