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
    var self = this;
    self.images = ["interior1.jpg", "interior2.jpg", "interior3.jpg", "interior4.jpg"];
    
}
angular.module("App")
    .controller("galleryController", ['$scope', GalleryController])
    .directive("gallery", GalleryDirective);