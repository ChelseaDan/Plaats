function GalleryDirective() {
    return {
        restrict: 'E',
        templateUrl: '/scripts/controllers/gallery/gallery.html',
        scope : {},
        controller: 'galleryController',
        controllerAs: 'vm',
        bindToController: true
    };
}
function GalleryController($scope) {
    $scope.images = ["interior1", "interior2", "interior3", "interior4"];
}
angular.module("App")
    .controller("galleryController", ['$scope', GalleryController])
    .directive("gallery", GalleryDirective);