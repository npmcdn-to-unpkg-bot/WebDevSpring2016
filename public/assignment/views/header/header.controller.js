
(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, $scope, UserService) {
        $scope.isActive = isActive;
        $scope.isAdmin = isAdmin;
        $scope.isNotAdmin = isNotAdmin;
        $scope.logout = logout;

        function isActive(route) {
            return route === $location.path();
        }

        function isAdmin() {
            var currentUser = $scope.currentUser;
            if(angular.isUndefined(currentUser))
                return false;
            return currentUser.roles.indexOf('admin') !== -1;
        }

        function isNotAdmin() {
            return $scope.currentUser && !isAdmin();
        }

        function logout(){
            UserService.setCurrentUser(undefined);
            $location.url('/home');
        }
    }
}());