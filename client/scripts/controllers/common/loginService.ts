///<reference path="../../../../typings/angular.d.ts" />
///<reference path="_common.ts" />
module App {
    export class LoginService {

        private signedIn: boolean;
        private token: string;

        static inject = ['$scope'];

        constructor(private $scope: ng.IScope, signedIn: boolean, token: string) {
            this.signedIn = false;
            this.token = "";
        }

        public setSignedIn() {
            this.signedIn = true;
        }

        public getSignedIn() {
            return this.signedIn;
        }

        public setToken(token: string) {
            this.token = token;
        }

        public getToken() {
            return this.token;
        }
    }
}
angular.module("App.common")
.service('loginService', App.LoginService);