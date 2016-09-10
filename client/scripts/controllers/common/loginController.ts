///<reference path="../../../../typings/angular.d.ts" />
///<reference path="loginService.ts" />
///<reference path="_common.ts" />
module App {
    export function LoginDirective(): ng.IDirective {
        return {
            restrict: 'E',
            templateUrl: '/scripts/controllers/common/login.html',
            scope : {},
            controller: 'loginController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

    export class LoginController {

        static $inject = ['$scope', '$http', 'spinnerService'];

        //Presentation logic.
        public signInSelected: boolean;
        public logInSelected: boolean;
        //User details.
        public firstName: String;
        public lastName: String;
        public emailAddress: String;
        public password: String;
        public displaySpinner: boolean;

        public constructor(
        private $scope: ng.IScope, 
        private $http: ng.IHttpService, 
        private spinnerService: any,
        private loginService: LoginService){
            this.logInSelected = false;
            this.signInSelected = true;
            this.displaySpinner = false;
        }

        public submitNewUserDetails() {
            this.displaySpinner = true;
            var newUser = {
                firstName: this.firstName,
                lastName: this.lastName, 
                emailAddress: this.emailAddress,
                password: this.password
            }
            this.$http.post('/api/accounts/register', newUser, {withCredentials: true}).then(response => {
                this.displaySpinner = false;
                this.loginService.setSignedIn();
            }, err => {
                this.displaySpinner = false;
            });

        }

        public submitLogInDetails() {
            this.displaySpinner = true;
            var existingUser = {
                emailAddress: this.emailAddress,
                password: this.password
            }
            this.$http.post('/api/accounts/login', existingUser, {withCredentials: true}).then(response => {
                this.displaySpinner = false;
                this.loginService.setSignedIn();
            }, err => {

            });
        }

        private signedIn() {
            return this.loginService.getSignedIn();
        }

        private signIn() {
            this.signInSelected = true;
            this.logInSelected = false;
        }

        private logIn() {
            this.logInSelected = true;
            this.signInSelected = false;
        }
    }
}
angular.module("App.common")
.controller("loginController", App.LoginController)
.directive("logIn", App.LoginDirective);