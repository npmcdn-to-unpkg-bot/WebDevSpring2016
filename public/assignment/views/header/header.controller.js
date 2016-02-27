
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, UserService) {
        $scope.logout = logout;

        function logout(){
            UserService.setCurrentUser(null);
            $location.url('/home');
        }
    }
}());