const {user, session, v1, aliyun} = require('../controllers')
console.log('aliyun is', aliyun);

exports = module.exports = [
  {method: 'get', path: '/aliyun/sts', cb: aliyun.sts},
  {method: 'get', path: '/users/:id', cb: user.userById}, 
  {method: 'get', path: '/users', cb: user.getUsers},
  {method: 'post', path: '/login', cb: session.login},
  {method: 'get', path: '/hunters', cb: v1.hunters.hunters},
  {method: 'get', path: '/hunters/:id', cb: v1.hunters.show},
  {method: 'put', path: '/hunters/:id', cb: v1.hunters.put},
]; 