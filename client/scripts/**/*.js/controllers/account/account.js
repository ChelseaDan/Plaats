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
            this.messages = [
                { id: 1, from: "sender1", title: "Hello world", content: "This is a message" },
                { id: 2, from: "sender2", title: "Hello world2", content: "This is the second message" },
                { id: 3, from: "sender3", title: "Hello world3", content: "This is the third message" },
            ];
            return this.messages;
        };
        AccountController.prototype.getMessageInfo = function (messageId) {
            this.viewEmailInfo = true;
            var filtered = _.filter(this.messages, function (message) {
                return message.id == messageId;
            });
            this.selectedMessage = filtered[0];
            console.log(this.selectedMessage);
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
        AccountController.$inject = ['$scope', 'loginService'];
        return AccountController;
    }());
    App.AccountController = AccountController;
})(App || (App = {}));
angular.module("App")
    .controller("accountController", App.AccountController);
