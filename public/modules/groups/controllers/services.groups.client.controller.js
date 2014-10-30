'use strict';

angular.module('groups').controller('ServicesGroupsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Groups', 'Services', 'Daemons',
    function ($scope, $stateParams, $location, Authentication, Groups, Services, Daemons) {
        $scope.authentication = Authentication;

        $scope.findOne = function () {
            $scope.group = Groups.get({
                groupId: $stateParams.groupId
            });

            $scope.services = {};
            $scope.services.all = Services.query();

            $scope.daemons = {};
            $scope.daemons.all = Daemons.query();
        };

        $scope.addImageToGroup = function (daemon, image) {
            var group = $scope.group;
            var containerName = image.name.replace('/', '-');
            if (containerName.indexOf(':') > 1) {
                containerName = containerName.substring(0, image.name.indexOf(':'));
            }

            group.containers.push({
                name: containerName,
                hostname: containerName, // todo add daemon.title
                image: image.name,
                ports: image.ports,
                volumes: image.volumes,
                daemon: {
                    protocol: daemon.protocol,
                    host: daemon.host,
                    port: daemon.port
                },
                active: true
            });

            group.$update(function () {
                $location.path('groups/' + group._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
    }
]);