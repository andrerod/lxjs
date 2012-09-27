
/*
 * GET users listing.
 */

var azure = require('azure');
var tableService = azure.createTableService();

exports.list = function(req, res) {
  var query = azure.TableQuery.select().from('users');
  tableService.queryEntities(query, function (err, userList) {
  	if (err) {
  		userList = [];
  	}
  	console.log(userList);
    res.render('users', { title: 'Users List', users: userList });
  });
};

exports.addUser = function (req, res) {
  res.render('addUser', { title: 'Add user' });
};

exports.addUserPost = function (req, res) {
  tableService.createTableIfNotExists('users', function () {
  	req.body.RowKey = new Date();
  	req.body.PartitionKey = 'users';

    tableService.insertEntity('users', req.body, function (err) {
    	console.log('insert: ' + err);
      res.redirect('/users');
    });
  });
};