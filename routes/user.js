
/*
 * GET users listing.
 */

var azure = require('azure');
var tableService = azure.createTableService();

exports.list = function(req, res) {
  tableService.createTableIfNotExists('users', function () {

	var query = azure.TableQuery.select().from('users');
	tableService.queryEntities(query, function (err, userList) {
  	  res.render('users', { title: 'Users List', users: userList });
  	});
  });
};

exports.addUser = function (req, res) {
  res.render('addUser', { title: 'Add user' });
};

exports.addUserPost = function (req, res) {

};