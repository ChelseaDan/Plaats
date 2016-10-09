function SearchController($scope) {
    $scope.dropzoneConfig = {
        'options': { // passed into the Dropzone constructor
            'url': '/api/upload',
            'addRemoveLinks': true
        },
        'eventHandlers': {
            'sending': function (file, xhr, formData) {
                console.log("sending");
            },
            'success': function (file, response) {
                console.log("success");
                console.log(file);
                console.log(response);
            }
        }
    }
}
angular.module("App")
    .controller("searchController", ['$scope', SearchController]);