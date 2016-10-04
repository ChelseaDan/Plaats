///<reference path="../../../../typings/angular.d.ts" />
///<reference path="../../app.ts" />
///<reference path="../common/loginService.ts" />
module App {

    export class AccountController {

        static $inject = ['$scope', 'loginService'];
        private numFollowers: number;
        private numMessages: number;
        private viewMessages: boolean;
        private viewAccountInfo: boolean;
        private viewEmailInfo: boolean;
        private messages;
        private selectedMessage;
        private user;

        public constructor(
        private $scope: ng.IScope,
        private loginService: LoginService) {
            this.user = this.loginService.getUser();
        }

        public getMessages() { 
            this.resetAllViews();
            this.viewMessages = true;
            this.messages = [
                {id: 1, time: from: "sender1", title: "Hello world", content: "This is a message"},
                {id: 2, from: "sender2", title: "Hello world2", content: "This is the second message"},
                {id: 3, from: "sender3", title: "Hello world3", content: "This is the third message"},
            ];
            return this.messages;
        }
        
        public getMessageInfo(messageId: number) {
            this.viewEmailInfo = true;
            var filtered = _.filter(this.messages, function(message : any) {
                return message.id == messageId; 
            });
            this.selectedMessage = filtered[0];
            console.log(this.selectedMessage);
        }

        public getAccountInfo() {
            this.resetAllViews();
            this.viewAccountInfo = true;
            this.user = this.loginService.getUser();
        }

        public resetAllViews() {
            this.viewAccountInfo = false;
            this.viewEmailInfo = false;
            this.viewMessages = false;
        }

    }
}
angular.module("App")
.controller("accountController", App.AccountController);