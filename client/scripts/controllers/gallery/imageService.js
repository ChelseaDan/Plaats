function LoginService($http) {

    var signedIn = false;

    return {
        registerUser: registerUser,
        existingUser: existingUser,
        getSignedIn: getSignedIn,
        getUser: getUser
    }

    function getImages(imagePath: string) {
        
    }

}
angular.module("App")
    .service('imageService', ['$http', LoginService]);