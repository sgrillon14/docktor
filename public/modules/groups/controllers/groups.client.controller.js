'use strict';

angular.module('groups').controller('GroupsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Groups', 'GroupsServices',
    function ($scope, $stateParams, $location, Authentication, Groups, GroupsServices) {
        $scope.authentication = Authentication;

        $scope.create = function () {
            var group = new Groups({
                title: this.title,
                description: this.description
            });
            group.$save(function (response) {
                $location.path('groups/' + response._id);

                $scope.title = '';
                $scope.description = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.remove = function (group) {
            if (group) {
                group.$remove();

                for (var i in $scope.groups) {
                    if ($scope.groups[i] === group) {
                        $scope.groups.splice(i, 1);
                    }
                }
            } else {
                $scope.group.$remove(function () {
                    $location.path('groups');
                });
            }
        };

        $scope.update = function () {
            var group = $scope.group;

            group.$update(function () {
                $location.path('groups/' + group._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function () {
            $scope.groups = Groups.query();
        };

        $scope.findOne = function () {
            $scope.group = Groups.get({
                groupId: $stateParams.groupId
            });
        };

        $scope.createContainer = function(container) {
            GroupsServices.create($scope.group._id, container._id);
        };

        $scope.startContainer = function(container) {
            GroupsServices.start($scope.group._id, container._id);
        };

        $scope.stopContainer = function(container) {
            GroupsServices.stop($scope.group._id, container._id);
        };

        $scope.pauseContainer = function(container) {
            GroupsServices.pause($scope.group._id, container._id);
        };
    }
]);