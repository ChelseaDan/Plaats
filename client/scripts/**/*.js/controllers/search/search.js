///<reference path="../../../../typings/angular.d.ts" />
///<reference path="../../app.ts" />
var App;
(function (App) {
    var SearchController = (function () {
        function SearchController($scope) {
            this.$scope = $scope;
            $scope.dropzoneConfig = {
                'options': {
                    'url': 'upload.php'
                },
                'eventHandlers': {
                    'sending': function (file, xhr, formData) {
                    },
                    'success': function (file, response) {
                    }
                }
            };
        }
        SearchController.$inject = ['$scope'];
        return SearchController;
    }());
    App.SearchController = SearchController;
})(App || (App = {}));
angular.module("App")
    .controller("searchController", App.SearchController);
