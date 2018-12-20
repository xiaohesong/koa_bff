const {user, session} = require('../controllers')

exports = module.exports = [{
  method: 'get',
  path: '/users/:id',
  cb: user.userById
}, {
  method: 'get',
  path: '/users',
  cb: user.getUsers
},{
  method: 'post',
  path: '/session/new',
  cb: session.login
}];