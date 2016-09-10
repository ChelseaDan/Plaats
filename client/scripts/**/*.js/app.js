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
