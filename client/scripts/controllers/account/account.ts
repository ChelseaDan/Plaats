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
        private newMessage: string;
        private messages;
        private selectedConversation : any[];
        private allSenders: string[];
        private selectedSender: string;
        private user;

        public constructor(
        private $scope: ng.IScope,
        private loginService: LoginService) {
            this.user = this.loginService.getUser();
        }

        public getMessages() { 
            this.resetAllViews();
            this.viewMessages = true;
            this.messages = {
                Person1: [{sent: true, content: "test123"}, {sent: false, content: "received123"}],
                Person2: [{sent: false, content: "Would you like some help with interiors?"}, {sent: true, content: "Yes please!"}]
            };
            this.allSenders = _.keys(this.messages);
            return this.messages;
        }
        
        public getMessageInfo(senderName: string) {
            this.viewEmailInfo = true;
            this.selectedSender = senderName;
            this.selectedConversation = this.messages[senderName];
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

        public sendMessage() {
            if (this.newMessage && this.newMessage.length > 0) {
                this.selectedConversation.push({sent: true, content: this.newMessage});
                this.newMessage = "";
            }
        }

    }
}
angular.module("App")
.controller("accountController", App.AccountController);