function LoginService($http) {

    var signedIn = false;

    return {
        registerUser: registerUser,
        existingUser: existingUser,
        getSignedIn: getSignedIn,
        getUser: getUser
    }

    function registerUser(newUser) {
        return $http.post('/api/accounts/register', newUser, { withCredentials: true }).then(function (response) {
            console.log(response);
            setSignedIn();
        }, function (err) {
            console.log("registerUser error occurred.");
        });
    }

    function existingUser(existingUser) {
        return $http.post('/api/accounts/login', existingUser, { withCredentials: true }).then(function (response) {
            console.log(response);
            setSignedIn();
        }, function (err) {
            console.log("existingUser error occurred.");
        });
    }

    function setSignedIn() {
        this.signedIn = true;
    }

    function getSignedIn() {
        return this.signedIn;
    }

    function getUser() {
        return { userName: "Daniel Graaf", emailAddress: "dan.graaf@yahoo.co.uk" };
    }
}
angular.module("App.common")
    .service('loginService', ['$http', LoginService]);