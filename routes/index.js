const {user} = require('../controllers')

exports = module.exports = [{
  method: 'get',
  path: '/users/:id',
  cb: user.userById
}, {
  method: 'get',
  path: '/users',
  cb: user.getUsers
}];