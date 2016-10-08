function AccountController($scope, loginService) {
    var self = this;
    self.$scope = $scope;
    self.loginService = loginService;
    self.user = loginService.getUser();

    self.getMessages = function () {
        self.resetAllViews();
        self.viewMessages = true;
        self.messages = {
            Person1: [{ sent: true, content: "test123" }, { sent: false, content: "received123" }],
            Person2: [{ sent: false, content: "Would you like some help with interiors?" }, { sent: true, content: "Yes please!" }]
        };
        self.allSenders = _.keys(self.messages);
        return self.messages;
    };
    self.getMessageInfo = function (senderName) {
        self.viewEmailInfo = true;
        self.selectedSender = senderName;
        self.selectedConversation = self.messages[senderName];
    };
    self.getAccountInfo = function () {
        self.resetAllViews();
        self.viewAccountInfo = true;
        self.user = self.loginService.getUser();
    };
    self.resetAllViews = function () {
        self.viewAccountInfo = false;
        self.viewEmailInfo = false;
        self.viewMessages = false;
    };
    self.sendMessage = function () {
        if (self.newMessage && self.newMessage.length > 0) {
            self.selectedConversation.push({ sent: true, content: self.newMessage });
            self.newMessage = "";
        }
    };
}

angular.module("App")
    .controller("accountController", ['$scope', 'loginService', AccountController]);