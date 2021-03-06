'use strict';

//Services service used for communicating with the services REST endpoints
angular.module('services').factory('Services', ['$resource',
    function ($resource) {
        return $resource('services/:serviceId', {
            serviceId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

angular.module('services').factory('ServicesServices', ['$http',
    function ($http) {
        return {
            getListSimplified: function () {
                return $http.get('/services/simplified');
            },
            getUrlsAndCommands: function (serviceId, groupId) {
                return $http.get('/services/urlsandcommands/' + serviceId + '/' + groupId);
            },
            activateJob: function (serviceId, job) {
                return $http.put('/services/jobs/activate/' + serviceId + '/' + job._id, {job: job});
            },
            desactivateJob: function (serviceId, job) {
                return $http.delete('/services/jobs/desactivate/' + serviceId + '/' + job._id);
            },
            pullImage: function(serviceId, image, daemon) {
                return $http.put('/services/' + serviceId + '/images', {imageId: image._id, daemonId: daemon.id});
            }
        };
    }
]);
