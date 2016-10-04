///<reference path="../../../../typings/angular.d.ts" />
///<reference path="_common.ts" />
module App {
    export class LoginService {

        private signedIn: boolean;
        private token: string;
        private user: User;

        static inject = ['$http'];

        constructor(private $http: ng.IHttpService) {
            this.signedIn = false;
            this.token = "";
        }

        public registerUser(newUser: any) {
            return this.$http.post('/api/accounts/register', newUser, {withCredentials: true}).then(response => {
                console.log(response);
                this.setSignedIn();
            }, err => {
                console.log("registerUser error occurred.");
            });
        }

        public existingUser(existingUser: any) {
            return this.$http.post('/api/accounts/login', existingUser, {withCredentials: true}).then(response => {
                console.log(response);
                this.setSignedIn();
            }, err => {
                console.log("existingUser error occurred.");
            });
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

        public getUser() {
            return this.user;
        }
    }
}
angular.module("App.common")
.service('loginService', App.LoginService);