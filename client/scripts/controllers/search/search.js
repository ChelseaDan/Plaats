function SearchController($scope) {
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
    }
}
angular.module("App")
    .controller("searchController", ['$scope', SearchController]);