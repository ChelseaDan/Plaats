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

app.config(function($stateProvider, $urlRouterProvider) {
    
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