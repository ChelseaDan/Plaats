function SearchController($scope, $location, $timeout) {
    $scope.dropzoneConfig = {
        'options': { // passed into the Dropzone constructor
            'url': '/api/upload',
            'addRemoveLinks': true
        },
        'eventHandlers': {
            'sending': function (file, xhr, formData) {
            },
            'queuecomplete': function(){
                
            },
            'success': function (file, response) {
                $location.url('/gallery');
                $scope.$apply();
            }
        }
    }
}
angular.module("App")
    .controller("searchController", ['$scope', '$location', '$timeout', SearchController]);