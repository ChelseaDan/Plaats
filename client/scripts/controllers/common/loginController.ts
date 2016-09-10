///<reference path="../../../../typings/angular.d.ts" />
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

        static $inject = ['$scope', '$http'];

        //Presentation logic.
        public displaySpinner: boolean;
        public signedIn: boolean;
        public signInSelected: boolean;
        public logInSelected: boolean;
        //User details.
        public firstName: String;
        public lastName: String;
        public emailAddress: String;
        public password: String;

        public constructor(private $scope: ng.IScope, private $http: ng.IHttpService){
            this.signedIn = false;
            this.logInSelected = false;
            this.signInSelected = true;
        }

        public submitNewUserDetails() {
            this.signedIn = true;
            var newUser = {
                firstName: this.firstName,
                lastName: this.lastName, 
                emailAddress: this.emailAddress,
                password: this.password
            }
            this.$http.post('/api/accounts/register', newUser, {withCredentials: true}).then(response => {
                console.log(response);
            });

        }

        public submitLogInDetails() {
            this.displaySpinner = true;
            this.signedIn = true;
            var existingUser = {
                emailAddress: this.emailAddress,
                password: this.password
            }
            this.$http.post('/api/accounts/login', existingUser, {withCredentials: true}).then(response => {
                console.log(response);
            });
        }

        private signIn() {
            this.signInSelected = true;
            this.logInSelected = false;
            console.log("Sign in selected: " + this.signInSelected);
            console.log("log in selected: " + this.logInSelected);
        }

        private logIn() {
            this.logInSelected = true;
            this.signInSelected = false;
            console.log("Sign in selected: " + this.signInSelected);
            console.log("log in selected: " + this.logInSelected);
        }
    }
}
angular.module("App.common")
.controller("loginController", App.LoginController)
.directive("logIn", App.LoginDirective);