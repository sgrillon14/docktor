'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
	groups = require('../../app/controllers/groups');

module.exports = function(app) {
	// Group Routes
	app.route('/groups')
		.get(groups.list)
		.post(users.requiresLogin, groups.create);

    app.route('/groups/container/create/:groupId/:containerId')
        .get(users.requiresLogin, groups.hasAuthorization, groups.createContainer);

    app.route('/groups/container/start/:groupId/:containerId')
        .get(users.requiresLogin, groups.hasAuthorization, groups.startContainer);

    app.route('/groups/container/stop/:groupId/:containerId')
        .get(users.requiresLogin, groups.hasAuthorization, groups.stopContainer);

	app.route('/groups/:groupId')
		.get(groups.read)
		.put(users.requiresLogin, groups.hasAuthorization, groups.update)
		.delete(users.requiresLogin, groups.hasAuthorization, groups.delete);

	// Finish by binding the group middleware
	app.param('groupId', groups.groupById);
	app.param('containerId', groups.containerById);
};