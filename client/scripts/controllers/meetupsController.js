app.controller('meetupsController', ['$scope', '$resource', '$http', function($scope, $resource, $http){
    var Meetup = $resource('/api/meetups');
    
    Meetup.query(function(result){
        $scope.meetups = result;
    });
    $scope.meetups = [];

    $scope.createMeetup = function() {
        var meetup = new Meetup();
        meetup.name = $scope.meetupName;
        meetup.$save(function(result){
            $scope.meetups.push(result);
            $scope.meetupName = "";
        });
    }

    $scope.removeMeetup = function(meetup) {

        var index = $scope.meetups.indexOf(meetup);
        $http.delete('api/meetups/' + meetup.name);
        console.log(index);
        
        $scope.meetups.splice(index, 1);
    }
}]);
