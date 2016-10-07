///<reference path="../../../../typings/angular.d.ts" />
///<reference path="../../app.ts" />
///<reference path="../common/loginService.ts" />
var App;
(function (App) {
    var AccountController = (function () {
        function AccountController($scope, loginService) {
            this.$scope = $scope;
            this.loginService = loginService;
            this.user = this.loginService.getUser();
        }
        AccountController.prototype.getMessages = function () {
            this.resetAllViews();
            this.viewMessages = true;
            this.messages = {
                Person1: [{ sent: true, content: "test123" }, { sent: false, content: "received123" }],
                Person2: [{ sent: false, content: "Would you like some help with interiors?" }, { sent: true, content: "Yes please!" }]
            };
            this.allSenders = _.keys(this.messages);
            return this.messages;
        };
        AccountController.prototype.getMessageInfo = function (senderName) {
            this.viewEmailInfo = true;
            this.selectedSender = senderName;
            this.selectedConversation = this.messages[senderName];
        };
        AccountController.prototype.getAccountInfo = function () {
            this.resetAllViews();
            this.viewAccountInfo = true;
            this.user = this.loginService.getUser();
        };
        AccountController.prototype.resetAllViews = function () {
            this.viewAccountInfo = false;
            this.viewEmailInfo = false;
            this.viewMessages = false;
        };
        AccountController.prototype.sendMessage = function () {
            if (this.newMessage && this.newMessage.length > 0) {
                this.selectedConversation.push({ sent: true, content: this.newMessage });
                this.newMessage = "";
            }
        };
        AccountController.$inject = ['$scope', 'loginService'];
        return AccountController;
    }());
    App.AccountController = AccountController;
})(App || (App = {}));
angular.module("App")
    .controller("accountController", App.AccountController);
