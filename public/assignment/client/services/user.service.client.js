(function () {
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope, $http) {
        var service = {
            createUser: createUser,
            updateUser: updateUser,

            findUserByCredentials: findUserByCredentials,
            loginUserByCredentials: loginUserByCredentials,
            findAllUsers: findAllUsers,

            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,

            createUserAdmin: createUserAdmin,
            deleteUserById: deleteUserById,
            updateUserAdmin: updateUserAdmin,

            logout: logout
        };
        return service;

        //Set the current user
        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        //Get the current user
        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        //Create a new User
        function createUserAdmin(user) {
            return $http.post("/api/assignment/admin/user", user);
        }

        function createUser(user) {
            return $http.post("/api/assignment/user", user);
        }

        //Update the current user
        function updateUserAdmin(userId, user) {
            return $http.put("/api/assignment/admin/user/" + userId, user);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        //Delete user by id
        function deleteUserById(userId) {
            return $http.delete("/api/assignment/admin/user/" + userId);
        }

        //Find user by credentials
        function findUserByCredentials(username, password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        //Return all the users
        function findAllUsers() {
            return $http.get("/api/assignment/admin/user");
        }

        //Login user by credentials
        function loginUserByCredentials(username, password) {
            var credentials = {
                username: username,
                password: password
            }
            return $http.post("/api/assignment/login", credentials);
        }

        function logout(){
            return $http.post("/api/assignments/logout");
        }

    }

}());