const {user, session, v1} = require('../controllers')

exports = module.exports = [
  {method: 'get', path: '/users/:id', cb: user.userById}, 
  {method: 'get', path: '/users', cb: user.getUsers},
  {method: 'post', path: '/login', cb: session.login},
  {method: 'get', path: '/hunters', cb: v1.hunters.hunters}
]; 