///<reference path="../../../../typings/angular.d.ts" />
///<reference path="../../app.ts" />
module App {

    export class SearchController {

        static $inject = ['$scope'];

        public constructor(
        private $scope: any) {
              $scope.dropzoneConfig = {
                'options': { // passed into the Dropzone constructor
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

    }

}
angular.module("App")
.controller("searchController", App.SearchController);