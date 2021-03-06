var q = require('q');
var uuid = require('node-uuid');

module.exports = function(db, mongoose) {

    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        createUser: createUser,
        updateUser: updateUser,
        deleteUserById: deleteUserById,

        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,

        createUserAdmin: createUserAdmin,
        findUserById: findUserById
    };

    return api;

    function createUserAdmin(user) {
        var deferred = q.defer();

        UserModel.create(user, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    //Create a new User
    function createUser(user) {
        //user._id = uuid.v1();
        if(user.username == 'admin')
            user.roles = ['admin'];
        else
            user.roles = ['member'];

        var deferred = q.defer();

        UserModel.create(user, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });

        return deferred.promise;
    }

    //Find user by credentials
    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        UserModel.findOne(
            { username: credentials.username,
                password: credentials.password },

            function(err, doc) {

                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    //Find user by username
    function findUserByUsername(username){
        var deferred = q.defer();

        UserModel.findOne(
            { username: username},

            function(err, doc) {

                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

    //Find all users
    function findAllUsers() {
        var deferred = q.defer();

        UserModel.find(
            function(err, res) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(res);
                }
            });

        return deferred.promise;
    }

    //Update user
    function updateUser(userId, user) {
        var deferred = q.defer();

        UserModel.update({_id: userId}, {$set: user}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                UserModel.findById(userId, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
        });

        return deferred.promise;
    }

    //delete the user
    function deleteUserById(userId) {
        var deferred = q.defer();

        UserModel.findByIdAndRemove(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

};